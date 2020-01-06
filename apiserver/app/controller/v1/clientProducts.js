'use strict';
const Controller = require('egg').Controller;

class clientProducts extends Controller {
  // 客户端获取商品列表
  async getProductsList() {
    const ctx = this.ctx;
    const { tag, page = 1, limit = 10, title = '', count, isRecommend } = ctx.query;
    const result = await ctx.service.clientProducts.getProductsList({ tag, page, limit, title, count, isRecommend });
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }
  // 客户端获取商品详情
  async detailProducts() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const result = await ctx.service.clientProducts.detailProducts({ id });
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }
  // 编辑商品评论
  async editProductsAppraisal() {
    const ctx = this.ctx;
    const uid = this.ctx.current_user.id;
    const { score, content, pid, oid } = ctx.request.body;
    const result = await ctx.service.clientProducts.editProductsAppraisal({ score, content, pid, uid, oid });
    if (result.status) {
      ctx.returnBody(200, true, null, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }
  // 客户端获取商品评价列表
  async getProductsAppraisal() {
    const ctx = this.ctx;
    const { page = 1, limit = 10 } = ctx.query;
    const id = ctx.params.id;
    const result = await ctx.service.clientProducts.getProductsAppraisal({ id, page, limit });
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }
}
module.exports = clientProducts;
