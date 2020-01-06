'use strict';

const Service = require('egg').Service;
class ClientActivitiesService extends Service {
  /**
   * 获取活动列表
   */
  async getList() {
    const result = await this.ctx.model.Activities.findAndCountAll({
      where: {
        status: 1,
        isShelf: 1,
      },
    });
    if (result) {
      return {
        res: result.rows,
        status: 1,
      };
    }
    return {
      res: '获取失败',
      status: 0,
    };
  }
  /**
   * 获取活动详情
   * @param {Number} aid -
   */
  async getInfo(aid) {
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
      productInfo.dataValues.cover = productInfo.dataValues.cover.split('|');
      productInfo.dataValues.detail = productInfo.dataValues.detail.split('|');
      if (productInfo) {
        productList.push(productInfo.dataValues);
      }
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
}

module.exports = ClientActivitiesService;
