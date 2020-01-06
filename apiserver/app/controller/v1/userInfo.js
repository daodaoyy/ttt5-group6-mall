'use strict';

const Controller = require('egg').Controller;

class UserInfoController extends Controller {
  // 修改密码
  async password() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('oldPassword') || !req.hasOwnProperty('newPassword')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.userInfo.password(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 获取个人信息
  async getInfo() {
    const info = await this.ctx.service.userInfo.getInfo();
    if (info.status) {
      this.ctx.returnBody(200, true, info.res);
    } else {
      this.ctx.returnBody(500, false, null, info.res);
    }
  }

  // 修改个人信息
  async putInfo() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('nickname')
      || !req.hasOwnProperty('avatar')
      || !req.hasOwnProperty('sign')
      || !req.hasOwnProperty('sex')
      || !req.hasOwnProperty('birthday')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.userInfo.putInfo(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 获取积分等级
  async getScore() {
    const info = await this.ctx.service.userInfo.getScore();
    if (info.status) {
      this.ctx.returnBody(200, true, info.res);
    } else {
      this.ctx.returnBody(500, false, null, info.res);
    }
  }

  // 更换绑定手机
  async putPhone() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('code')
      || !req.hasOwnProperty('newPhone')
      || !req.hasOwnProperty('newCode')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.userInfo.putPhone(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }
}

module.exports = UserInfoController;
