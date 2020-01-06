'use strict';

const Controller = require('egg').Controller;

class AdminMemberController extends Controller {
  // 获取会员列表/搜索会员
  async getMembers() {
    const { page = 1, limit = 10, type = null, keyword = null } = this.ctx.query;
    let user;
    if (type && keyword) {
      // 搜索
      user = await this.ctx.service.adminMember.searchMembers(+page, +limit, +type, keyword);
    } else {
      user = await this.ctx.service.adminMember.getMembers(+page, +limit);
    }
    if (user.status) {
      this.ctx.returnBody(200, true, user.res);
    } else {
      this.ctx.returnBody(500, false, null, user.res);
    }
  }

  // 获取会员详情
  async getMemberDetail() {
    const { id = null } = this.ctx.params;
    if (id) {
      const user = await this.ctx.service.adminMember.getMemberDetail(id);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    } else {
      this.ctx.returnBody(400, false, null, '输入错误');
    }
  }

  // 修改会员状态
  async delMember() {
    const req = this.ctx.request.body;
    if (!req.hasOwnProperty('phone')) {
      this.ctx.returnBody(400, false, '输入错误', '输入错误');
    } else {
      const user = await this.ctx.service.adminMember.delMember(req);
      if (user.status) {
        this.ctx.returnBody(200, true, user.res);
      } else {
        this.ctx.returnBody(500, false, null, user.res);
      }
    }
  }
}

module.exports = AdminMemberController;
