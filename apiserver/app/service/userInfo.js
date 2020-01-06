'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class UserInfoService extends Service {
  /**
   * 修改密码
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async password(req) {
    if (/[\u4e00-\u9fa5]/.test(req.newPassword)) {
      return {
        status: 0,
        res: '密码格式错误',
      };
    }
    if (/[\u4e00-\u9fa5]/.test(req.oldPassword)) {
      return {
        status: 0,
        res: '旧密码格式错误',
      };
    }
    const user = await this.ctx.model.User.findOne({ where: { phone: this.ctx.current_user.phone } });
    if (user.password !== crypto.createHash('md5').update(req.oldPassword).digest('hex')) return { status: 0, res: '密码错误' };
    const updateData = await this.ctx.model.User.update({ password: crypto.createHash('md5').update(req.newPassword).digest('hex') }, { where: { phone: this.ctx.current_user.phone } });
    if (updateData[0]) return { status: 1, res: null };
    return { status: 0, res: '修改密码失败' };
  }

  /**
   * 获取个人信息
   * @return {Object} - return data
   */
  async getInfo() {
    const user = await this.ctx.model.User.findOne({ where: { phone: this.ctx.current_user.phone } });
    if (user) {
      return {
        status: 1,
        res: {
          nickname: user.nickname,
          avatar: user.avatar,
          sign: user.sign,
          sex: user.sex,
          birthday: user.birthday,
        },
      };
    }
    return { status: 0, res: '查询失败' };
  }

  /**
   * 修改个人信息
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async putInfo(req) {
    if (req.birthday.length !== 10 || typeof req.sex !== 'number') {
      return {
        status: 0,
        res: '输入格式错误',
      };
    }
    const user = await this.ctx.model.User.update({
      nickname: req.nickname,
      avatar: req.avatar,
      sign: req.sign,
      sex: +req.sex,
      birthday: req.birthday,
    }, { where: { phone: this.ctx.current_user.phone } });
    if (user[0]) return { status: 1, res: null };
    return { status: 0, res: '查询失败' };
  }

  /**
   * 获取积分等级
   * @return {Object} - return data
   */
  async getScore() {
    let user = await this.ctx.model.User.findOne({ where: { phone: this.ctx.current_user.phone } });
    user = user.dataValues;
    if (user) {
      let level = 1;
      if (user.totalScore > 1000) { level = 2; } // 9.9
      if (user.totalScore > 2000) { level = 3; } // 9.8
      if (user.totalScore > 5000) { level = 4; } // 9.5
      if (user.totalScore > 10000) { level = 5; } // 9.2
      if (user.totalScore > 30000) { level = 6; } // 9
      if (user.totalScore > 50000) { level = 7; } // 8.8
      return {
        status: 1,
        res: {
          score: user.score,
          level,
        },
      };
    }
    return { status: 0, res: '查询失败' };
  }

  /**
   * 更换绑定手机
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async putPhone(req) {
    if (req.newPhone.length !== 11 || typeof req.code !== 'number' || typeof req.newCode !== 'number') {
      return {
        status: 0,
        res: '输入格式错误',
      };
    }
    const isCode = await this.ctx.service.zhenziyun.veryCode({
      phone: this.ctx.current_user.phone,
      code: req.code,
    });
    if (!isCode.status) return isCode;
    const isNewCode = await this.ctx.service.zhenziyun.veryCode({
      phone: req.newPhone,
      code: req.newCode,
    });
    if (!isNewCode.status) return isNewCode;
    const isExist = await this.ctx.model.User.findOne({ where: { phone: req.newPhone } });
    if (isExist) {
      return {
        status: 0,
        res: '该手机号已经被绑定用户了',
      };
    }
    const user = await this.ctx.model.User.update({
      phone: req.newPhone,
    }, { where: { id: this.ctx.current_user.id } });
    if (user[0]) return { status: 1, res: null };
    return { status: 0, res: '修改失败' };
  }
}

module.exports = UserInfoService;
