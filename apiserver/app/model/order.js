'use strict';
module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;

  const Orders = app.model.define('orders', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30), // 订单收货人的名字
    phone: STRING(11), // 订单收货人手机号
    address: STRING(5000), // 收货人地址
    createTime: { type: DATE, field: 'create_time' }, // 时间
    updateTime: { type: DATE, field: 'update_time' }, // 更新时间
    oid: { type: STRING(18), primaryKey: true }, // 订单号
    uid: { type: INTEGER, primaryKey: true }, // 用户ID
    status: { type: INTEGER, defaultValue: 1 }, // 0：删除，1，待付款，2，已付款/待发货，3，已发货/未收货。4.已收货， 5，失效订单，6，用户端删除了，不想显示 7.退货/退款种，8提醒发货
    discount: { type: INTEGER, defaultValue: 0 }, // 0:不折扣 0-100.等级折扣
    score: { type: INTEGER, defaultValue: 0 }, // 订单总积分,score = 0, discount 不为0，表示采用折扣，不采用积分。
    sale: { type: INTEGER, defaultValue: 0 }, // 订单总价
  });
  return Orders;
};
