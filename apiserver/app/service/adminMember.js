'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class AdminMemberService extends Service {
  /**
   * 会员列表
   * @param {Number} page -
   * @param {Number} limit -
   * @return {Object} - return data
   */
  async getMembers(page, limit) {
    const data = await this.ctx.model.User.findAndCountAll({
      attributes: [ 'phone', 'nickname', 'createTime', 'updateTime', 'birthday', 'avatar', 'sign', 'sex', 'totalScore', 'score', 'status' ],
      where: { status: { [Op.in]: [ 1, 0 ] } },
      order: [[ 'createTime', 'DESC' ]],
      limit,
      offset: (page - 1) * limit,
    });
    if (data) {
      return {
        status: 1,
        res: {
          limit,
          page,
          pages: Math.ceil(+data.count / limit), // 总页码
          data: data.rows,
        },
      };
    }
    return {
      status: 0,
      res: '操作失败',
    };
  }

  /**
   * 搜索会员列表
   * @param {Number} page -
   * @param {Number} limit -
   * @param {Number} type -
   * @param {String} keyword -
   * @return {Object} - return data
   */
  async searchMembers(page, limit, type, keyword) {
    if (type === 1) { // 1,用户手机号
      const data = await this.ctx.model.User.findAndCountAll({
        attributes: [ 'phone', 'nickname', 'createTime', 'updateTime', 'birthday', 'avatar', 'sign', 'sex', 'totalScore', 'score', 'status' ],
        where: { phone: { [Op.like]: `%${keyword}%` } },
        order: [[ 'createTime', 'DESC' ]],
        limit,
        offset: (page - 1) * limit,
      });
      if (data) {
        return {
          status: 1,
          res: {
            limit,
            page,
            pages: Math.ceil(+data.count / limit), // 总页码
            data: data.rows,
          },
        };
      }
    }
    if (type === 2) { // 2,用户名
      const data = await this.ctx.model.User.findAndCountAll({
        attributes: [ 'phone', 'nickname', 'createTime', 'updateTime', 'birthday', 'avatar', 'sign', 'sex', 'totalScore', 'score', 'status' ],
        where: { nickname: { [Op.like]: `%${keyword}%` } },
        order: [[ 'createTime', 'DESC' ]],
        limit,
        offset: (page - 1) * limit,
      });
      if (data) {
        return {
          status: 1,
          res: {
            limit,
            page,
            pages: Math.ceil(+data.count / limit), // 总页码
            data: data.rows,
          },
        };
      }
    }
    return {
      status: 0,
      res: '查询失败',
    };
  }

  /**
   * 会员详情
   * @param {Number} phone -
   * @return {Object} - return data
   */
  async getMemberDetail(phone) {
    const data = await this.ctx.model.User.findOne({
      attributes: [ 'phone', 'nickname', 'createTime', 'updateTime', 'birthday', 'avatar', 'sign', 'sex', 'totalScore', 'score', 'status' ],
      where: { phone },
    });
    if (data) {
      return {
        status: 1,
        res: data,
      };
    }
    return {
      status: 0,
      res: '操作失败',
    };
  }

  /**
   * 修改会员状态
   * @param {Object} req -
   * @return {Object} - return data
   */
  async delMember(req) {
    const data = await this.ctx.model.User.update({ status: +req.status }, {
      where: { phone: req.phone },
    });
    if (data) {
      return {
        status: 1,
        res: null,
      };
    }
    return {
      status: 0,
      res: '操作失败',
    };
  }
}

module.exports = AdminMemberService;
