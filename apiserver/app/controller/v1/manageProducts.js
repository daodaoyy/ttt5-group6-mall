'use strict';

const Controller = require('egg').Controller;

class manageProducts extends Controller {

  // 获取商品列表
  async getProductsList() {
    const ctx = this.ctx;
    const { tag, page = 1, limit = 10, title = '' } = ctx.query;
    const result = await ctx.service.manageProducts.getProductsList({ tag, page, limit, title });
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 添加商品
  async addProducts() {
    const ctx = this.ctx;
    const { title, cover, desc, detail, price, tag, isRecommend, discount, stock } = ctx.request.body;
    const result = await ctx.service.manageProducts.addProducts({ title, cover, desc, detail, price, tag, isRecommend, discount, stock });
    if (result.status) {
      ctx.returnBody(200, true, null, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 删除商品
  async deleteProducts() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const result = await ctx.service.manageProducts.deleteProducts({ id });
    if (result.status) {
      ctx.returnBody(200, true, null, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 修改商品
  async editProducts() {
    const ctx = this.ctx;
    const { title, cover, desc, detail, price, tag, stock, discount, isRecommend, isShelf } = ctx.request.body;
    const { id } = ctx.params;
    const result = await ctx.service.manageProducts.editProducts({ id, title, cover, desc, detail, price, tag, stock, discount, isRecommend, isShelf });
    if (result.status) {
      ctx.returnBody(200, true, null, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 获取商品详情
  async detailProducts() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const result = await ctx.service.manageProducts.detailProducts({ id });
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }
}

module.exports = manageProducts;
