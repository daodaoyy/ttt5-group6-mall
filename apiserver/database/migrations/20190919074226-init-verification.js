'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      INTEGER,
      STRING,
      DATE,
    } = Sequelize;
    await queryInterface.createTable('vcodes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      createTime: { type: DATE, field: 'create_time' }, // 创建日期
      updateTime: { type: DATE, field: 'update_time' },
      phone: STRING(11), // 手机号
      vcode: INTEGER,
      status: { type: INTEGER, defaultValue: 1 }, // 是否删除
    });
  },
  // 在执行数据库降级时调用的函数，删除 verification 表
  down: async queryInterface => {
    await queryInterface.dropTable('vcodes');
  },
};
