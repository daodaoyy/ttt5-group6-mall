'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class OrderService extends Service {
  /**
   * 创建订单
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async createOrder(req) {
    // 订单号，13位时间+手机号后两位+3位随机数=18位
    const oid = `${new Date().getTime()}${this.ctx.current_user.phone.toString().slice(9)}${+(Math.random() * 1000000).toString().slice(0, 3)}`;
    // 查找商品信息
    /* eslint-disable-next-line */
    let ordersList = []; // 列表
    let totalPrice = 0;// 总价格
    for (const i in req.products) {
      const ele = req.products[i];
      // 判断前端数据是否合理
      if (ele.count < 1) return { status: 0, res: '商品数量不能为空' };
      const productInfo = await this.ctx.model.Products.findOne({ where: { id: ele.id } });
      if (productInfo) {
        if (!productInfo.dataValues.isShelf) return { status: 0, res: '有商品已下架' };
        if (productInfo.dataValues.stock < ele.count) return { status: 0, res: productInfo.dataValues.title + '商品售罄不足' };
        productInfo.dataValues.count = ele.count; // 数量替换
        productInfo.dataValues.sale = ele.count * productInfo.dataValues.price; // 实际价格替换
        ordersList.push(productInfo.dataValues); // 添加到列表暂存
        totalPrice += productInfo.dataValues.price * ele.count; // 计算总价格
      }
    }
    req.products = ordersList;
    // 计算总价/每个商品实际价格
    // discount 和score同时为0，表示既不折扣，也不积分
    // score = 0, discount 不为0，表示采用折扣，不采用积分。
    // 0:等级折扣,0-100.活动折扣

    if (+req.score !== 0 && +req.discount !== 0) {
      return { status: 0, res: '创建订单失败,只可选择一种优惠' };
    }

    // 积分情况
    if (+req.score !== 0 && +req.discount === 0) { // 暂时未考虑四舍五入导致的羊毛问题
      const userScore = await this.ctx.service.userInfo.getScore();
      if (userScore.status) {
        if (userScore.res.score < req.score) return { status: 0, res: '创建订单失败，剩余积分不足' };
        const score = (req.score / 100).toFixed(2); // 100积分抵扣一元
        const diveceScore = score / totalPrice; // 每块钱代表抵扣钱数
        totalPrice = 0;
        for (const i in req.products) {
          // 计算每个商品占用得积分抵消后价格
          req.products[i].sale = req.products[i].sale - (diveceScore * req.products[i].sale).toFixed(2);
          totalPrice += req.products[i].sale;
        }
      }
      if (!userScore.status) return { status: 0, res: '创建订单失败' };
    }

    if (+req.score === 0 && +req.discount !== 0) {
      // 折扣时
      // 查看活动情况
      const levelData = await this.ctx.service.userInfo.getScore();
      /* eslint-disable-next-line */
      let level = 1;
      if (levelData.status) {
        level = levelData.res.level;
      } else {
        return { status: 0, res: '创建订单失败' };
      }
      // 计算等级折扣
      /* eslint-disable-next-line */
      let socreDiscount = 1;
      if (level === 2) { socreDiscount = 0.98; } // 9.8
      if (level === 3) { socreDiscount = 0.95; } // 9.5
      if (level === 4) { socreDiscount = 0.92; } // 9.2
      if (level === 5) { socreDiscount = 0.9; } // 9
      if (level === 6) { socreDiscount = 0.88; } // 8.8
      // 处理打折
      totalPrice = 0;
      for (const i in req.products) {
        if (req.products[i].discount === 0) { // 采用积分等级
          req.products[i].sale = req.products[i].sale * socreDiscount;
          req.products[i].discount = socreDiscount * 100; // 重新赋予目前折扣数
          totalPrice += req.products[i].sale;
        } else { // 采用活动
          req.products[i].sale = req.products[i].sale * req.products[i].discount / 100;
          totalPrice += req.products[i].sale;
        }
      }
    }

    // orderProduct表存数据
    for (const i in req.products) {
      const productInfo = await this.ctx.model.OrderProduct.create({
        oid,
        pid: req.products[i].id,
        title: req.products[i].title,
        cover: req.products[i].cover,
        desc: req.products[i].desc,
        price: req.products[i].price,
        count: req.products[i].count,
        tag: req.products[i].tag,
        sale: req.products[i].sale,
      });
      if (!productInfo) return { status: 0, res: '创建订单失败1' };
    }

    // order表存订单
    const orderInfo = await this.ctx.model.Order.create({
      name: req.name, // 订单收货人的名字
      phone: req.phone, // 订单收货人手机号
      address: req.address, // 收货人地址
      oid, // 订单号
      uid: this.ctx.current_user.id, // 用户ID
      discount: +req.discount, // 0:不折扣 0-100.等级折扣
      score: +req.score, // 订单总积分,score = 0, discount 不为0，表示采用折扣，不采用积分。
      sale: +totalPrice, // 订单总价
    });

    if (orderInfo) {
      // 更新用户积分,减去抵消积分,不增加新积分
      await this.ctx.model.User.decrement(
        {
          score: +req.score,
        },
        {
          where: {
            id: this.ctx.current_user.id,
          },
        });
      // 更新商品销售额和数量，减去库存
      req.products.forEach(async e => {
        await this.ctx.model.Products.increment(
          {
            count: e.count,
            sale: e.sale,
            stock: -e.count,
          },
          {
            where: {
              id: e.id,
            },
          });
      });
      const data = await this.getOrderDetail(oid);
      if (data.status) {
        return { status: 1, res: data.res };
      }
    }
    return { status: 0, res: '创建订单失败3 ' };
  }

  /**
   * 获取订单详情
   * @param {String} oid - {}
   * @return {Object} - return data
   */
  async getOrderDetail(oid) {
    if (oid.length !== 18) return { status: 0, res: '输入格式错误' };
    const orderInfo = await this.ctx.model.Order.findOne({
      attributes: [ 'oid', 'createTime', 'updateTime', 'discount', 'status', 'score', 'sale', 'name', 'phone', 'address' ],
      where: { oid, status: { [Op.notIn]: [ 0, 6 ] } } });
    const productList = await this.ctx.model.OrderProduct.findAndCountAll({
      attributes: [ 'pid', 'title', 'cover', 'desc', 'price', 'count', 'sale', 'status', 'isAppraisal', 'tag' ],
      where: { oid } });
    if (productList && orderInfo) {
      /* eslint-disable-next-line */
      let data = orderInfo.dataValues;
      for (const i in productList.rows) {
        if (productList.rows.hasOwnProperty(i)) {
          productList.rows[i].cover = productList.rows[i].cover.split('|');
        }
      }
      data.products = productList.rows;
      return { status: 1, res: data };
    }
    return { status: 0, res: '无数据' };
  }

  /**
   * 修改订单状态
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async changeOrderStatus(req) {
    if (req.id.length !== 18 || typeof req.status !== 'number') return { status: 0, res: '输入格式错误' };
    if (req.status === 3 || req.status === 0) return { status: 0, res: '越权，操作订单失败' };
    if (req.status === 4) { // 确认收货
      // 增加积分
      const info = await this.getOrderDetail(req.id);
      if (!info.status) return { status: 0, res: '操作订单失败' };
      // 退款中
      // 订单状态，解决方法：每次查询所有商品是否
      // 商品状态
      // 单个和全部
      let isAll = 0;
      for (const i in info.res.products) {
        if (info.res.products.hasOwnProperty(i)) {
          const element = info.res.products[i];
          if (element.status !== 2) {
            isAll += 1;
          }
        }
      }
      if (!isAll) return { status: 0, res: '确认收货失败，订单所有商品已退货' };
      // 更新积分，增加积分和总积分，确认收货是所有商品
      await this.ctx.model.User.increment(
        {
          score: Math.floor(info.res.sale),
          totalScore: Math.floor(info.res.sale),
        },
        {
          where: {
            id: this.ctx.current_user.id,
          },
        });
    }

    if (req.status === 5) { // 客户端表现为取消订单
      // 可用积分增加，总积分减少，库存增加，销量减去，销售额减去

      const info = await this.getOrderDetail(req.id);
      if (!info.status) return { status: 0, res: '操作订单失败' };
      // 退抵扣的积分
      await this.ctx.model.User.increment(
        {
          score: info.res.score,
        },
        {
          where: {
            id: this.ctx.current_user.id,
          },
        });
      // 释放库存,减去商品销量和销售额
      info.res.products.forEach(async e => {
        await this.ctx.model.Products.increment(
          {
            count: -e.count,
            sale: -e.sale,
            stock: e.count,
          },
          {
            where: {
              id: e.pid,
            },
          });
      });
      await this.ctx.model.Order.update({
        sale: 0,
      }, {
        where: { oid: req.id, status: 1 } });
    }

    const orderInfo = await this.ctx.model.Order.update({
      status: req.status,
    }, {
      where: { oid: req.id, status: { [Op.notIn]: [ 0, 6 ] } } });
    if (orderInfo[0]) {
      return { status: 1, res: null };
    }
    return { status: 0, res: '操作订单失败' };
  }

  /**
   * 删除订单
   * @param {String} oid - {}
   * @return {Object} - return data
   */
  async delOrder(oid) {
    if (oid.length !== 18) return { status: 0, res: '输入格式错误' };
    const orderInfo = await this.ctx.model.Order.update({
      status: 6,
    }, {
      where: { oid } });
    if (orderInfo[0]) {
      return { status: 1, res: null };
    }
    return { status: 0, res: '删除订单失败' };
  }

  /**
   * 获取订单列表
   * @param {Number} page -
   * @param {Number} limit -
   * @param {Number} type -
   * @return {Object} - return data
   */
  async getOrderList(page, limit, type) {
    // let data = {
    //   rows: null,
    // };
    // all
    let status = { [Op.notIn]: [ 0, 6 ] };
    if (type === 1) { // 待付款，status:1/5
      status = 1;
    }
    if (type === 2) { // 待发货，status:2/8，提醒发货了
      status = { [Op.in]: [ 2, 8 ] };
    }

    if (type === 3) { // 待收获，status:3/7，退货中
      status = { [Op.in]: [ 3, 7 ] };
    }

    if (type === 4) { // 待评价，status:4，已收货的
      status = 4;
    }

    const data = await this.ctx.model.Order.findAndCountAll({
      attributes: [ 'oid' ],
      where: { status, uid: this.ctx.current_user.id },
      order: [[ 'createTime', 'DESC' ]],
      limit,
      offset: (page - 1) * limit,
    });

    if (!data.rows) return { status: 0, res: '查询失败' };
    if (data.rows.length === 0) {
      return {
        status: 1,
        res: {
          limit,
          page,
          pages: Math.ceil(+data.count / limit), // 总页码
          data: [],
        },
      };
    }
    /* eslint-disable-next-line */
    let orderList = [];
    for (const i in data.rows) {
      const ele = data.rows[i];
      const orderItem = await this.getOrderDetail(ele.oid);
      if (orderItem.status) {
        orderList.push(orderItem.res);
      } else {
        if (orderItem.res !== '无数据') {
          return orderItem;
        }
      }
    }
    return {
      status: 1,
      res: {
        limit,
        page,
        pages: Math.ceil(+data.count / limit), // 总页码
        data: orderList,
      },
    };
  }

  /**
   * 退货
   * @param {String} oid -
   * @param {String} pid -
   * @return {Object} - return data
   */
  async refundOrder(oid, pid) {
    if (oid.length !== 18 || typeof pid !== 'number') return { status: 0, res: '输入格式错误' };
    // 更新商品状态
    const orderInfo = await this.ctx.model.OrderProduct.update({
      status: 2,
    }, {
      where: { oid, pid } });
    // 退款中
    // 订单状态，解决方法：每次查询所有商品是否
    // 商品状态
    // 单个和全部
    const orderItem = await this.getOrderDetail(oid);
    let isAll = 0;
    for (const i in orderItem.res.products) {
      if (orderItem.res.products.hasOwnProperty(i)) {
        const element = orderItem.res.products[i];
        if (element.status !== 2) {
          isAll += 1;
        }
      }
    }
    // 更新订单状态
    if (!isAll) {
      await this.ctx.model.Order.update({
        status: 7,
      }, {
        where: { oid } });
    }
    if (orderInfo[0]) {
      return { status: 1, res: null };
    }
    return { status: 0, res: '退货失败' };
  }
}

module.exports = OrderService;
