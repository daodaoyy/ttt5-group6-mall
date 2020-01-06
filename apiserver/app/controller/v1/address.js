'use strict';

const Controller = require('egg').Controller;

class AddressController extends Controller {
  // 获取地址列表
  async getAddress() {
    const info = await this.ctx.service.address.getAddress();
    if (info.status) {
      this.ctx.returnBody(200, true, info.res);
    } else {
      this.ctx.returnBody(500, false, null, info.res);
    }
  }

  // 添加地址
  async postAddress() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('name')
      || !req.hasOwnProperty('phone')
      || !req.hasOwnProperty('address')
      || !req.hasOwnProperty('isDefault')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.address.postAddress(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 修改地址
  async putAddress() {
    const { id } = this.ctx.params;
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('name')
      || !req.hasOwnProperty('phone')
      || !req.hasOwnProperty('address')
      || !req.hasOwnProperty('isDefault')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      req.id = id;
      const user = await this.ctx.service.address.putAddress(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }

  // 删除地址
  async delAddress() {
    const { id } = this.ctx.params;
    const user = await this.ctx.service.address.delAddress(id);
    if (user.status) {
      this.ctx.returnBody(200, true, user.res, '删除成功');
    } else {
      this.ctx.returnBody(500, false, null, user.res);
    }
  }
}

module.exports = AddressController;
