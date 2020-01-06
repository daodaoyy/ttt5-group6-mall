'use strict';

const Controller = require('egg').Controller;

class ShoppingCartController extends Controller {
  // 创建购物车
  async createShoppingCart() {
    const ctx = this.ctx;
    const phone = ctx.current_user.phone;
    const prouctInfo = ctx.request.body.data;
    const res = await ctx.service.shoppingcart.createShoppingCart(phone, prouctInfo);
    if (res.status) {
      this.ctx.returnBody(200, true, res.res);
    } else {
      this.ctx.returnBody(500, false, null, res.res);
    }
  }

  // 获取购物车
  async getShoppingCart() {
    const ctx = this.ctx;
    const phone = ctx.current_user.phone;
    const { page = 1, limit = 10 } = ctx.query;
    const res = await ctx.service.shoppingcart.getShoppingCart(phone, page, limit);
    if (res.status) {
      this.ctx.returnBody(200, true, res.res);
    } else {
      this.ctx.returnBody(500, false, null, res.res);
    }
  }
}

module.exports = ShoppingCartController;
