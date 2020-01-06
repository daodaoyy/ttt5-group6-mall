'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  // 更新订单信息
  async updateOrderInfo() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const result = await ctx.service.manageOrder.updateOrderInfo(body.status, body.oid);
    if (result.status) {
      ctx.returnBody(200, true, null, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 管理端获取订单列表
  async getOrderList() {
    const ctx = this.ctx;
    const { limit = 10, page = 1, type, keyword } = ctx.query;
    const result = await ctx.service.manageOrder.getOrderList(page, limit, type, keyword);
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 获取订单详情
  async getOrderInfo() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.manageOrder.getOrderInfo(id);
    if (result.status) {
      ctx.returnBody(200, true, result.data);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 退货
  async refundOrder() {
    const { id } = this.ctx.params;
    const req = this.ctx.request.body;
    const orderInfo = await this.ctx.service.manageOrder.refundOrder(id, req.pid, req.status);
    if (orderInfo.status) {
      this.ctx.returnBody(200, true, orderInfo.res);
    } else {
      this.ctx.returnBody(500, false, null, orderInfo.res);
    }
  }
}

module.exports = OrderController;
