'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  // 会员注册
  async register() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('phone') || !req.hasOwnProperty('password') || !req.hasOwnProperty('code')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.account.register(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 会员登录
  async login() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('phone') || !req.hasOwnProperty('password')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.account.login(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 忘记密码
  async forget() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('phone') || !req.hasOwnProperty('password') || !req.hasOwnProperty('code')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.account.forget(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }
}

module.exports = AccountController;
