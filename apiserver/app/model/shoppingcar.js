'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ShoppingCar = app.model.define('shoppingcar', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    createTime: { type: DATE, field: 'create_time' }, // 创建日期
    updateTime: { type: DATE, field: 'update_time' },
    phone: STRING(11), // 手机号
    pid: INTEGER, // 商品ID
    count: INTEGER, // 商品数量
  });
  return ShoppingCar;
};
