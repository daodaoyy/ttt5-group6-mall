'use strict';

const Controller = require('egg').Controller;

class AdminUserController extends Controller {
  // 添加工作人员
  async join() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('username') || !req.hasOwnProperty('password')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.adminUser.join(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 登录
  async login() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('username') || !req.hasOwnProperty('password')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.adminUser.login(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 编辑管理员
  async putUser() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('username')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.adminUser.putUser(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 删除管理员
  async delUser() {
    const { id } = this.ctx.params;
    const user = await this.ctx.service.adminUser.delUser(id);
    if (user.status) {
      this.ctx.returnBody(200, true, user.res);
    } else {
      this.ctx.returnBody(500, false, null, user.res);
    }
  }

  // 管理员列表
  async getUser() {
    const { page = 1, limit = 10 } = this.ctx.query;
    const user = await this.ctx.service.adminUser.getUser(+page, +limit);
    if (user.status) {
      this.ctx.returnBody(200, true, user.res);
    } else {
      this.ctx.returnBody(500, false, null, user.res);
    }
  }
}

module.exports = AdminUserController;
