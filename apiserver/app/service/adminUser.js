'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class AdminUserService extends Service {
  /**
   * 签名
   * @param {Object} user - {}
   * @return {Object} - return data
   */
  generateToken(user) {
    return this.ctx.app.jwt.sign({ username: user.username, id: user.id, role: user.role, exp: Date.now() + 24 * 60 * 60 * 1000 }, this.ctx.app.config.jwt.secret);
  }

  /**
   * 添加工作人员
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async join(req) {
    if (!/([a-zA-Z0-9._-]+)+$/.test(req.username)) {
      return {
        status: 0,
        res: '用户名格式错误',
      };
    }
    if (/[\u4e00-\u9fa5]/.test(req.password)) {
      return {
        status: 0,
        res: '密码格式错误',
      };
    }
    let user = await this.ctx.model.AdminUser.findOne({ where: { username: req.username } });
    if (user) {
      return {
        status: 0,
        res: '用户已存在',
      };
    }
    user = await this.ctx.model.AdminUser.create({
      username: req.username,
      password: crypto.createHash('md5').update(req.password).digest('hex'),
    });
    const token = this.generateToken(user);
    return {
      status: 1,
      res: {
        token,
        info: null,
      },
    };
  }

  /**
   * 登录
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async login(req) {
    if (!/([a-zA-Z0-9._-]+)+$/.test(req.username)) {
      return {
        status: 0,
        res: '用户名格式错误',
      };
    }
    if (/[\u4e00-\u9fa5]/.test(req.password)) {
      return {
        status: 0,
        res: '密码格式错误',
      };
    }
    const user = await this.ctx.model.AdminUser.findOne({ where: { username: req.username } });
    if (user) {
      if (user.status === 0 || user.status === 2) return { status: 0, res: '账户已被禁用或不存在' };
      if (user.password === crypto.createHash('md5').update(req.password).digest('hex')) {
        const token = this.generateToken(user);
        return {
          status: 1,
          res: {
            token,
            info: {
              username: user.username,
              role: user.role,
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
   * 编辑管理员
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async putUser(req) {
    if (!/([a-zA-Z0-9._-]+)+$/.test(req.username)) {
      return {
        status: 0,
        res: '用户名格式错误',
      };
    }
    // 重置密码
    if (req.hasOwnProperty('password')) {
      if (req.password.length > 5) {
        const updateData = await this.ctx.model.AdminUser.update({ password: crypto.createHash('md5').update(req.password).digest('hex') }, { where: { username: req.username } });
        if (updateData[0]) return { status: 1, res: null };
        return {
          status: 0,
          res: '重置密码失败',
        };
      }
      return { status: 0, res: '密码格式错误' };
    }
    // 修改权限
    if (req.hasOwnProperty('role')) {
      if (typeof req.role === 'number') {
        const updateData = await this.ctx.model.AdminUser.update({ role: req.role }, { where: { username: req.username } });
        if (updateData[0]) return { status: 1, res: null };
        return {
          status: 0,
          res: '修改权限失败',
        };
      }
      return { status: 0, res: '权限格式错误' };
    }
    // 修改账号状态
    if (req.hasOwnProperty('status')) {
      if (typeof req.status === 'number') {
        const updateData = await this.ctx.model.AdminUser.update({ status: req.status }, { where: { username: req.username } });
        if (updateData[0]) return { status: 1, res: null };
        return {
          status: 0,
          res: '修改账号状态失败',
        };
      }
      return { status: 0, res: '状态格式错误' };
    }
    return {
      status: 0,
      res: '操作失败',
    };
  }

  /**
   * 删除管理员
   * @param {String} req - {}
   * @return {Object} - return data
   */
  async delUser(req) {
    // 修改账号状态
    const updateData = await this.ctx.model.AdminUser.update({ status: 0 }, { where: { username: req } });
    if (updateData[0]) return { status: 1, res: null };
    return {
      status: 0,
      res: '操作失败',
    };
  }

  /**
   * 管理员列表
   * @param {Number} page -
   * @param {Number} limit -
   * @return {Object} - return data
   */
  async getUser(page, limit) {
    const data = await this.ctx.model.AdminUser.findAndCountAll({
      attributes: [ 'id', 'username', 'createTime', 'updateTime', 'role', 'status' ],
      where: { status: [ 1, 2 ] },
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
}

module.exports = AdminUserService;
