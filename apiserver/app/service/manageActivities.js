'use strict';

const Service = require('egg').Service;

class ManageActivitiesService extends Service {
  // 添加活动
  async createActivity(info) {
    const productsId = info.products.split(',');
    productsId.forEach(async (pid, index) => {
      await this.ctx.model.Products.update({ discount: info.discount[index] }, { where: { id: pid } });
    });
    const result = await this.ctx.model.Activities.create({
      title: '', // 活动名
      cover: info.cover, // 活动封面图
      desc: '', // 活动描述
      detail: info.detail, // 活动详情图
      products: info.products, // 活动商品（字符串形式 ,拼接）
      status: 1,
      isShelf: 0,
      time: '', // 活动时间
    });
    if (result) {
      return {
        res: '添加成功',
        status: 1,
      };
    }
    return {
      res: '添加失败',
      status: 0,
    };
  }

  // 删除商品
  async deleteActivity(id) {
    const result = await this.ctx.model.Activities.update({ status: 0 }, {
      where: {
        id,
      },
    });
    const aInfo = await this.ctx.model.Activities.findOne({
      where: {
        id,
      },
    });
    const productsId = aInfo.dataValues.products.split(',');
    for (const i in productsId) {
      const ele = productsId[ i ];
      await this.ctx.model.Products.update({ discount: 0 }, { where: { id: ele } });
    }
    if (result[0]) {
      return {
        res: '删除成功',
        status: 1,
      };
    }
    return {
      res: '删除失败',
      status: 0,
    };
  }

  // 更新活动上下架
  async updateActivity(id, isShelf) {
    const haveShelfActivity = await this.ctx.model.Activities.findAndCountAll({
      where: {
        isShelf: 1,
        status: 1,
      },
    });
    if (!haveShelfActivity.count && isShelf) {
      const result = await this.ctx.model.Activities.update({ isShelf }, {
        where: {
          id,
        },
      });
      if (result[0]) {
        return {
          res: '上架成功',
          status: 1,
        };
      }
      return {
        res: '状态更新失败',
        status: 0,
      };
    }
    if (!isShelf) {
      const aInfo = await this.ctx.model.Activities.findOne({
        where: {
          id,
        },
      });
      const productsId = aInfo.dataValues.products.split(',');
      for (const i in productsId) {
        const ele = productsId[ i ];
        await this.ctx.model.Products.update({ discount: 0 }, { where: { id: ele } });
      }
      const result = await this.ctx.model.Activities.update({ isShelf }, {
        where: {
          id,
        },
      });
      if (result[0]) {
        return {
          res: '下架成功',
          status: 1,
        };
      }
      return {
        res: '状态更新失败',
        status: 0,
      };
    }
    if (haveShelfActivity.count && isShelf) {
      return {
        res: '已经有上线活动',
        status: 1,
      };
    }
  }

  // 获取活动列表
  async getList(page, limit) {
    const intLimit = parseInt(limit);
    const intPage = parseInt(page);
    const result = await this.ctx.model.Activities.findAndCountAll({
      where: {
        status: 1,
      },
      limit: intLimit,
      offset: (intPage - 1) * intLimit,
    });
    if (result) {
      for (let i = 0; i < result.rows.length; i++) {
        result.rows[i].time = result.rows[i].time.split(' ');
      }
      const res = {
        limit: intLimit, // 每页数量，默认10
        pages: Math.ceil(result.count / intLimit), // 总页码
        activities: result.rows,
        sum: result.count,
        status: 1,
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

  async getInfo(aid) {
    // 获取对应活动信息
    const intId = parseInt(aid);
    const aInfo = await this.ctx.model.Activities.findOne({
      where: {
        id: intId,
      },
    });
    const productsId = aInfo.dataValues.products.split(',');
    const productList = [];
    for (const i in productsId) {
      const ele = productsId[ i ];
      const productInfo = await this.ctx.model.Products.findOne({ where: { id: ele } });
      if (productInfo) {
        productList.push(productInfo.dataValues);
      }
    }
    for (let i = 0; i < productList.length; i++) {
      productList[i].cover = productList[i].cover.split('|');
      productList[i].detail = productList[i].detail.split('|');
    }
    if (aInfo && productList.length !== 0) {
      aInfo.time = aInfo.time.split(' ');
      const data = {
        aInfo,
        productList,
      };
      return {
        res: data,
        status: 1,
      };
    }
    return {
      res: '获取失败',
      status: 0,
    };
  }

  // 更新活动商品
  async updateActivityProducts(aid, info) {
    const productsId = info.products.split(',');
    for (let i = 0; i < productsId.length; i++) {
      await this.ctx.model.Products.update({ discount: info.discount[i] }, { where: { id: parseInt(productsId[i]) } });
    }
    const result = await this.ctx.model.Activities.update({
      products: info.products,
      title: '',
      time: '',
      cover: info.cover,
      desc: '',
      detail: info.detail,
      isShelf: info.isShelf }, {
      where: {
        id: aid,
      },
    });
    if (result[0]) {
      return {
        res: '状态更新成功',
        status: 1,
      };
    }
    return {
      res: '状态更新失败',
      status: 0,
    };
  }
}

module.exports = ManageActivitiesService;
