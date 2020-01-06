'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 orderProduct 表
  up: async (queryInterface, Sequelize) => {
    const {
      INTEGER,
      DATE,
      STRING,
    } = Sequelize;
    await queryInterface.createTable('orderProduct', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      createTime: { type: DATE, field: 'create_time' }, // 时间
      updateTime: { type: DATE, field: 'update_time' }, // 更新时间
      oid: { type: STRING(18), primaryKey: true }, // 订单号
      pid: { type: INTEGER, primaryKey: true }, // 商品ID
      title: STRING(5000), // 商品title
      cover: STRING(5000), // 封面图, 图片链接数组，默认空
      desc: STRING(5000), // 商品简单描述, 默认空
      price: { type: INTEGER, defaultValue: 0 }, // 单价,默认0
      count: { type: INTEGER, defaultValue: 0 }, // 销售数量,默认0
      tag: { type: INTEGER, defaultValue: 1 }, // 分类,默认1
      status: { type: INTEGER, defaultValue: 1 }, // 是否是退货商品  0退货商品  1正常商品
      sale: { type: INTEGER }, // 折扣后价格，实际价格
      isAppraisal: { type: INTEGER, defaultValue: 0, field: 'is_appraisal' }, // 评价状态,0未评价
    });
  },
  // 在执行数据库降级时调用的函数，删除 orderProducts 表
  down: async queryInterface => {
    await queryInterface.dropTable('orderProduct');
  },
};
