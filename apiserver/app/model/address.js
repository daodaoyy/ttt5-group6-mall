'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Address = app.model.define('address', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: { type: INTEGER, primaryKey: true }, // 用户id
    createTime: { type: DATE, field: 'create_time' }, // 创建日期
    updateTime: { type: DATE, field: 'update_time' },
    name: { type: STRING(76), defaultValue: '佚名' }, // 收货人
    phone: STRING(11), // 手机号
    address: { type: STRING(255), defaultValue: '福建省厦门市' }, // 收货地址
    isDefault: { type: INTEGER, field: 'is_default', defaultValue: 0 }, // 默认地址
    status: { type: INTEGER, defaultValue: 1 }, // 是否删除
  });

  return Address;
};
