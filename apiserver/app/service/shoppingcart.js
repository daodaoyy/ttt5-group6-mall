'use strict';

const Service = require('egg').Service;

class ShoppingCartService extends Service {
  // 存购物车信息
  async createShoppingCart(uphone, productInfo) {
    const cartList = await this.ctx.model.Shoppingcar.findAndCountAll({ where: { phone: uphone } });
    if (cartList.rows.length) {
      await this.ctx.model.Shoppingcar.destroy({ where: { phone: uphone } });
    }
    productInfo.forEach(async info => {
      await this.ctx.model.Shoppingcar.create({
        phone: uphone,
        pid: info.id,
        count: info.productNumber,
      });
    });
    return {
      res: '购物车保存成功',
      status: 1,
    };
  }

  // 获取购物车信息
  async getShoppingCart(uphone, page = 1, limit = 10) {
    const intPage = parseInt(page);
    const intLimit = parseInt(limit);
    const result = await this.ctx.model.Shoppingcar.findAndCountAll({
      where: {
        phone: uphone,
      },
      limit: intLimit,
      offset: (intPage - 1) * intLimit,
    });
    const productsList = [];
    for (let i = 0; i < result.rows.length; i++) {
      const productInfo = await this.ctx.model.Products.findAndCountAll({
        attributes: [ 'id', 'title', 'cover', 'desc', 'detail', 'price', 'score', 'count', 'tag', 'stock', 'discount', 'isShelf' ],
        where: {
          id: result.rows[i].pid,
        },
      });
      productInfo.rows[0].count = result.rows[i].count;
      productsList.push(productInfo.rows[0]);
    }
    if (result) {
      for (let i = 0; i < result.rows.length; i++) {
        productsList[i].cover = productsList[i].cover.split('|');
        productsList[i].detail = productsList[i].detail.split('|');
      }
      const res = {
        limit: intLimit, // 每页数量，默认10
        page: intPage, // 当前页，默认1
        pages: Math.ceil(result.count / intLimit), // 总页码
        products: productsList,
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
}

module.exports = ShoppingCartService;
