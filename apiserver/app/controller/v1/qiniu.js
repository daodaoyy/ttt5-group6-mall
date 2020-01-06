'use strict';

const Controller = require('egg').Controller;

class QiniuController extends Controller {
  // 获取七牛token
  async getToken() {
    // bucket
    const reqData = this.ctx.request.body;
    if (!reqData.hasOwnProperty('bucket')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const res = await this.ctx.service.qiniu.getToken(reqData.bucket);
      if (res.status) {
        this.ctx.returnBody(200, true, res.res);
      } else {
        this.ctx.returnBody(500, false, null, res.res);
      }
    }
  }
}

module.exports = QiniuController;
