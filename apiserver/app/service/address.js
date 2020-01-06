'use strict';

const Service = require('egg').Service;

class AddressService extends Service {
  /**
   * 获取地址列表
   * @return {Object} - return data
   */
  async getAddress() {
    const info = await this.ctx.model.Address.findAll({ attributes: [ 'id', 'phone', 'address', 'name', 'isDefault' ], where: { uid: this.ctx.current_user.id, status: 1 } });
    if (info) {
      const user = await this.ctx.model.User.findOne({ where: { phone: this.ctx.current_user.phone } });
      for (const i in info) {
        if (info.hasOwnProperty(i)) {
          const ele = info[i];
          if (ele.id === user.dataValues.defaultAddress) {
            ele.isDefault = true;
          } else {
            ele.isDefault = false;
          }
        }
      }
      return { status: 1, res: info };
    }
    return {
      status: 0,
      res: '查询失败',
    };
  }

  /**
   * 添加地址
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async postAddress(req) {
    if (req.phone.length !== 11 || typeof req.isDefault !== 'boolean') {
      return {
        status: 0,
        res: '输入格式错误',
      };
    }
    const info = await this.ctx.model.Address.create({
      name: req.name,
      phone: req.phone,
      address: req.address,
      uid: this.ctx.current_user.id,
    });
    // 修改默认地址
    if (req.isDefault) {
      const updateData = await this.ctx.model.User.update({ defaultAddress: info.dataValues.id }, { where: { phone: this.ctx.current_user.phone } });
      if (!updateData[0]) return { status: 0, res: '添加失败' };
    }
    if (info) return { status: 1, res: null };
    return {
      status: 0,
      res: '添加失败',
    };
  }

  /**
   * 修改地址
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async putAddress(req) {
    if (req.phone.length !== 11 || typeof req.isDefault !== 'boolean') {
      return {
        status: 0,
        res: '输入格式错误',
      };
    }
    const info = await this.ctx.model.Address.update({
      name: req.name,
      phone: req.phone,
      address: req.address,
    }, {
      where: { id: req.id, status: 1 },
    });
    // 修改默认地址
    if (req.isDefault) {
      const updateData = await this.ctx.model.User.update({ defaultAddress: req.id }, { where: { phone: this.ctx.current_user.phone } });
      if (!updateData[0]) return { status: 0, res: '添加失败' };
    }
    if (info[0]) return { status: 1, res: null };
    return {
      status: 0,
      res: '添加失败',
    };
  }

  /**
   * 删除地址
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async delAddress(req) {
    const info = await this.ctx.model.Address.update({
      status: 0,
    }, {
      where: { id: req, status: 1 },
    });
    if (info[0]) return { status: 1, res: null };
    return {
      status: 0,
      res: '添加失败',
    };
  }
}

module.exports = AddressService;
