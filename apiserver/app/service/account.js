'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class AccountService extends Service {
  /**
   * 签名
   * @param {Object} user - {}
   * @return {Object} - return data
   */
  generateToken(user) {
    return this.ctx.app.jwt.sign({ phone: user.phone, id: user.id, exp: Date.now() + 24 * 60 * 60 * 1000 }, this.ctx.app.config.jwt.secret);
  }

  /**
   * 注册
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async register(req) {
    if (!/^[1]([3-9])[0-9]{9}$/.test(req.phone)) {
      return {
        status: 0,
        res: '手机号格式错误',
      };
    }
    if (/[\u4e00-\u9fa5]/.test(req.password)) {
      return {
        status: 0,
        res: '密码格式错误',
      };
    }
    let user = await this.ctx.model.User.findOne({ where: { phone: req.phone } });
    if (user) {
      return {
        status: 0,
        res: '用户已存在',
      };
    }
    const isCode = await this.ctx.service.zhenziyun.veryCode({
      phone: req.phone,
      code: req.code,
    });
    if (isCode.status) {
      user = await this.ctx.model.User.create({
        phone: req.phone,
        password: crypto.createHash('md5').update(req.password).digest('hex'),
      });
      const token = this.generateToken(user);
      return {
        status: 1,
        res: {
          token,
          info: {
            phone: user.phone,
            avatar: user.avatar,
            nickname: user.nickname,
          },
        },
      };
    }
    return {
      status: 0,
      res: '验证手机号失败,注册失败',
    };
  }

  /**
   * 登录
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async login(req) {
    if (!/^[1]([3-9])[0-9]{9}$/.test(req.phone)) {
      return {
        status: 0,
        res: '手机号格式错误',
      };
    }
    if (/[\u4e00-\u9fa5]/.test(req.password)) {
      return {
        status: 0,
        res: '密码格式错误',
      };
    }
    const user = await this.ctx.model.User.findOne({ where: { phone: req.phone } });
    if (user) {
      if (!user.status) return { status: 0, res: '账户已被禁用或不存在' };
      if (user.password === crypto.createHash('md5').update(req.password).digest('hex')) {
        const token = this.generateToken(user);
        return {
          status: 1,
          res: {
            token,
            info: {
              phone: user.phone,
              avatar: user.avatar,
              nickname: user.nickname,
            },
          },
        };
      }
    }
    return {
      status: 0,
      res: '账户或密码错误',
    };
  }

  /**
   * 忘记密码
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async forget(req) {
    if (!/^[1]([3-9])[0-9]{9}$/.test(req.phone)) {
      return {
        status: 0,
        res: '手机号格式错误',
      };
    }
    if (/[\u4e00-\u9fa5]/.test(req.password)) {
      return {
        status: 0,
        res: '密码格式错误',
      };
    }
    const user = await this.ctx.model.User.findOne({ where: { phone: req.phone } });
    if (user) {
      if (!user.status) return { status: 0, res: '账户已被禁用或不存在' };
      const isCode = await this.ctx.service.zhenziyun.veryCode({
        phone: req.phone,
        code: req.code,
      });
      if (isCode.status) {
        const updateData = await this.ctx.model.User.update({ password: crypto.createHash('md5').update(req.password).digest('hex') }, { where: { phone: req.phone } });
        if (!updateData[0]) return { status: 0, res: '找回密码失败' };
        const userInfo = await this.ctx.model.User.findOne({ where: { phone: req.phone } });
        return {
          status: 1,
          res: {
            token: this.generateToken(userInfo),
            info: {
              phone: user.phone,
              avatar: user.avatar,
              nickname: user.nickname,
            },
          },
        };
      }
      return isCode;
    }
    return {
      status: 0,
      res: '账户不存在',
    };
  }
}

module.exports = AccountService;
