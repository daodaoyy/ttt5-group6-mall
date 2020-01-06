'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('appraisal', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true }, // 订单id,自增id
      createTime: { type: DATE, field: 'create_time' }, // 时间
      updateTime: { type: DATE, field: 'update_time' }, // 更新时间
      score: { type: INTEGER }, // 评分
      content: STRING(5000), // 评价内容
      pid: { type: INTEGER }, // 商品id
      uid: { type: INTEGER }, // 用户id
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('appraisal');
  },
};
