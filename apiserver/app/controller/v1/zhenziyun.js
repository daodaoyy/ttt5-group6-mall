'use strict';

const Controller = require('egg').Controller;

class ZhenziyunController extends Controller {
  // 获取验证码
  async getVerification() {
    const ctx = this.ctx;
    const phone = ctx.request.body.phone;
    const res = await ctx.service.zhenziyun.getVerification(phone);
    if (res.status) {
      this.ctx.returnBody(200, true, res.res);
    } else {
      this.ctx.returnBody(500, false, null, res.res);
    }
  }

  // 验证验证码
  async veryCode() {
    const req = this.ctx.request.body;
    const res = await this.ctx.service.zhenziyun.veryCode(req);
    if (res.status) {
      this.ctx.returnBody(200, true, res.res);
    } else {
      this.ctx.returnBody(500, false, null, res.res);
    }
  }
}

module.exports = ZhenziyunController;
