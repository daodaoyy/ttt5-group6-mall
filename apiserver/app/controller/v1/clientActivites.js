'use strict';

const Controller = require('egg').Controller;

class ClientActivitiesController extends Controller {
  // 获取活动列表
  async getList() {
    const ctx = this.ctx;
    const result = await ctx.service.clientActivities.getList();
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }

  // 获取活动详情
  async getInfo() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.clientActivities.getInfo(id);
    if (result.status) {
      ctx.returnBody(200, true, result.res);
    } else {
      ctx.returnBody(500, false, null, result.res);
    }
  }
}

module.exports = ClientActivitiesController;
