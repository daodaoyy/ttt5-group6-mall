'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  // 创建订单
  async createOrder() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('products')
      || !req.hasOwnProperty('name')
      || !req.hasOwnProperty('phone')
      || !req.hasOwnProperty('address')
      || !req.hasOwnProperty('discount')
      || !req.hasOwnProperty('score')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.order.createOrder(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 获取订单详情
  async getOrderDetail() {
    const { id } = this.ctx.params;
    const orderInfo = await this.ctx.service.order.getOrderDetail(id);
    if (orderInfo.status) {
      this.ctx.returnBody(200, true, orderInfo.res);
    } else {
      this.ctx.returnBody(500, false, null, orderInfo.res);
    }
  }

  // 修改订单状态
  async changeOrderStatus() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('id') || !req.hasOwnProperty('status')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const orderInfo = await this.ctx.service.order.changeOrderStatus(req);
      if (orderInfo.status) {
        this.ctx.returnBody(200, true, orderInfo.res);
      } else {
        this.ctx.returnBody(500, false, null, orderInfo.res);
      }
    }
  }

  // 删除订单
  async delOrder() {
    const { id } = this.ctx.params;
    const orderInfo = await this.ctx.service.order.delOrder(id);
    if (orderInfo.status) {
      this.ctx.returnBody(200, true, orderInfo.res);
    } else {
      this.ctx.returnBody(500, false, null, orderInfo.res);
    }
  }

  // 获取订单列表
  async getOrderList() {
    const { page = 1, limit = 10, type = 0 } = this.ctx.query;
    const orderInfo = await this.ctx.service.order.getOrderList(+page, +limit, +type);
    if (orderInfo.status) {
      this.ctx.returnBody(200, true, orderInfo.res);
    } else {
      this.ctx.returnBody(500, false, null, orderInfo.res);
    }
  }

  // 退货
  async refundOrder() {
    const { id } = this.ctx.params;
    const req = this.ctx.request.body;
    const orderInfo = await this.ctx.service.order.refundOrder(id, req.pid);
    if (orderInfo.status) {
      this.ctx.returnBody(200, true, orderInfo.res);
    } else {
      this.ctx.returnBody(500, false, null, orderInfo.res);
    }
  }
}

module.exports = OrderController;
