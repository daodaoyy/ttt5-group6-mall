'use strict';
const Service = require('egg').Service;

class OrderService extends Service {
  /**
   * 更新订单状态
   * @param {Number} status -
   * @param {String} oid -
   * @return {Object} - return data
   */
  async updateOrderInfo(status, oid) {
    // body - status/oid
    if (oid.length !== 18 || typeof status !== 'number') return { status: 0, res: '输入格式错误' };
    const beforeOrder = await this.getOrderInfo(oid);
    if (!beforeOrder.status) return { res: '操作失败', status: 0 };
    if (beforeOrder.data.status === 5
      || beforeOrder.data.status === 6
      || beforeOrder.data.status === 0
      || beforeOrder.data.status === 1
      || status === 2
      || status === 6
      || status === 1
      || status === 4) return { status: 0, res: '越权操作' };
    // 退款确认
    if (status === 5) {
      if (beforeOrder.status && beforeOrder.data.status === 7) {
        const result = await this.ctx.model.Order.update({ status: 5 }, { where: { oid } });
        if (result[0]) {
          // 退抵扣的积分
          await this.ctx.model.User.increment(
            {
              score: beforeOrder.data.score,
            },
            {
              where: {
                id: this.ctx.current_user.id,
              },
            });

          // 释放库存,减去商品销量和销售额
          beforeOrder.data.products.forEach(async e => {
            await this.ctx.model.Products.increment(
              {
                count: -e.count,
                sale: -e.sale,
                stock: e.count,
              },
              {
                where: {
                  id: e.id,
                },
              });
          });
          return {
            res: '退款成功',
            status: 1,
          };
        }
      }
      return { status: 0, res: '退款确认失败' };
    }
    // 发货
    if (status === 3 && beforeOrder.status && (beforeOrder.data.status === 2 || beforeOrder.data.status === 8)) {
      const result = await this.ctx.model.Order.update({ status: 3 }, { where: { oid } });
      if (result[0]) {
        return {
          res: '发货成功',
          status: 1,
        };
      }
    }
    return {
      res: '操作失败',
      status: 0,
    };
  }

  /**
   * 获取订单列表
   * @param {Number} page -
   * @param {Number} limit -
   * @param {Number} type -
   * @param {Number} keyword -
   * @return {Object} - return data
   */
  async getOrderList(page, limit, type, keyword) {
    const intPage = parseInt(page);
    const intLimit = parseInt(limit);
    const intType = parseInt(type);
    // // 是否有type
    let result;
    if (intType === 1) {
      result = await this.ctx.model.Order.findAndCountAll({
        where: { oid: keyword },
        order: [[ 'createTime', 'DESC' ]],
        limit: intLimit,
        offset: (intPage - 1) * intLimit,
      });
    }
    if (intType === 2) {
      result = await this.ctx.model.Order.findAndCountAll({
        where: { phone: keyword },
        order: [[ 'createTime', 'DESC' ]],
        limit: intLimit,
        offset: (intPage - 1) * intLimit,
      });
    }
    if (!type) {
      result = await this.ctx.model.Order.findAndCountAll({
        order: [[ 'createTime', 'DESC' ]],
        limit: intLimit,
        offset: (intPage - 1) * intLimit,
      });
    }
    // 请求成功
    await Promise.all(result.rows.map(async (e, index) => {
      const pinfo = await this.ctx.model.OrderProduct.findAndCountAll({
        where: {
          oid: e.oid,
        },
      });
      const haverefund = pinfo.rows.find(info => info.status === 2);
      if (haverefund) {
        result.rows[index].discount = true;
      } else {
        result.rows[index].discount = false;
      }
    }));
    if (result) {
      const res = {
        limit: intLimit, // 每页数量，默认10
        pages: Math.ceil(result.count / intLimit), // 总页码
        orderList: result.rows, // 订单列表
        sum: result.count,
      };
      return {
        res,
        status: 1,
      };
    }
    return {
      res: '获取失败',
      status: 0,
    };
  }

  /**
   * 获取订单的详情信息
   * @param {String} oid -
   * @return {Object} - return data
   */
  async getOrderInfo(oid) {
    const order = await this.ctx.model.Order.findOne({
      where: {
        oid,
      },
    });
    const result = await this.ctx.model.OrderProduct.findAndCountAll({
      where: { oid },
    });
    if (result) {
      for (let i = 0; i < result.rows.length; i++) {
        result.rows[i].cover = result.rows[i].cover.split('|');
      }
      return {
        data: {
          oid: order.dataValues.oid,
          uid: order.dataValues.uid,
          createTime: order.dataValues.createTime,
          status: order.dataValues.status,
          name: order.dataValues.name,
          sale: order.dataValues.sale,
          phone: order.dataValues.phone,
          score: order.dataValues.score,
          address: order.dataValues.address,
          products: result.rows,
        },
        status: 1,
      };
    }
    return {
      res: '获取失败',
      status: 0,
    };
  }

  /**
   * 管理员退货操作
   * @param {String} oid -
   * @param {String} pid -
   * @param {String} status - 0退货商品  1正常商品, 2退货中
   * @return {Object} - return data
   */
  async refundOrder(oid, pid, status) {
    if (oid.length !== 18 || typeof pid !== 'number') return { status: 0, res: '输入格式错误' };
    const orderInfo = await this.ctx.model.OrderProduct.update({
      status,
    }, {
      where: { oid, pid } });
    if (orderInfo[0] && status === 0) {
      // 减去积分dataValues
      const info = await this.ctx.model.OrderProduct.findOne({ where: { oid, pid, status: 0 } });
      const order = await this.ctx.model.Order.findOne({
        where: {
          oid,
        },
      });

      // 减去商品销量和销售额,增加库存
      await this.ctx.model.Products.increment(
        {
          count: -info.dataValues.count,
          sale: -info.dataValues.sale,
          stock: info.dataValues.count,
        },
        {
          where: {
            id: pid,
          },
        });

      // 已收货得时候，需要减去增加的积分
      if (order.dataValues.status === 4) {
        await this.ctx.model.User.decrement(
          {
            score: info.dataValues.sale,
            totalScore: info.dataValues.sale,
          },
          {
            where: {
              id: this.ctx.current_user.id,
            },
          });
      }

      // 使用积分抵扣得时候，需要增加抵扣得积分
      if (order.dataValues.score !== 0) {
        await this.ctx.model.User.increment(
          {
            score: (info.dataValues.price * info.dataValues.count - info.dataValues.sale) * 100,
          },
          {
            where: {
              id: this.ctx.current_user.id,
            },
          });
      }

      // 退款中
      // 订单状态，解决方法：每次查询所有商品是否
      // 商品状态
      // 单个和全部
      const orderItem = await this.ctx.service.order.getOrderDetail(oid);
      let isAll = 0;
      let isHasCorrect = 0;
      for (const i in orderItem.res.products) {
        if (orderItem.res.products.hasOwnProperty(i)) {
          const element = orderItem.res.products[i];
          if (element.status === 1) {
            isHasCorrect += 1;
          }
          if (element.status === 2) {
            isAll += 1;
          }
        }
      }
      // 更新订单状态
      if (!isAll && !isHasCorrect) { // 全部退款了
        await this.ctx.model.Order.update({
          status: 5, sale: 0,
        }, {
          where: { oid } });
        // 商品信息，总积分减少
      }

      return { status: 1, res: null };
    }
    return { status: 0, res: '退货操作失败' };
  }
}

module.exports = OrderService;
