'use strict';

const Controller = require('egg').Controller;

class ManageActivitiesController extends Controller {
  // 管理员获取活动列表
  async getList() {
    const ctx = this.ctx;
    const page = ctx.query.page;
    const limit = ctx.query.limit;
    const result = await ctx.service.manageActivities.getList(page, limit);
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 管理员获取活动详情
  async getInfo() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.manageActivities.getInfo(id);
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 管理员新增活动
  async createActivity() {
    const ctx = this.ctx;
    const info = ctx.request.body;
    const result = await ctx.service.manageActivities.createActivity(info);
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }

  }

  // 管理员删除活动
  async deleteActivity() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.manageActivities.deleteActivity(id);
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 管理员上下架活动
  async updateActivity() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const isShelf = ctx.request.body.isShelf;
    const result = await ctx.service.manageActivities.updateActivity(id, isShelf);
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 管理员更新活动商品
  async updateActivityProducts() {
    const ctx = this.ctx;
    const info = ctx.request.body;
    const id = ctx.params.id;
    const result = await ctx.service.manageActivities.updateActivityProducts(id, info);
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }
}

module.exports = ManageActivitiesController;
