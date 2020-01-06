'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      INTEGER,
      STRING,
      DATE,
    } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      phone: { type: STRING(11), primaryKey: true }, // 手机号
      createTime: { type: DATE, field: 'create_time' }, // 创建日期
      updateTime: { type: DATE, field: 'update_time' },
      nickname: { type: STRING(76), defaultValue: '佚名' }, // 昵称
      birthday: { type: STRING(10), defaultValue: '2019-01-01' }, // 出生日期1990-01-01
      password: STRING(76),
      avatar: { type: STRING(255), defaultValue: 'https://qnimg.vadxq.com/blog/2016/blogheadimg20160517.jpg' }, // 头像，默认为一个链接
      sign: { type: STRING(255), defaultValue: '无' }, // 签名
      sex: { type: INTEGER, defaultValue: 0 }, // 0女1男2保密
      status: { type: INTEGER, defaultValue: 1 }, // 状态，
      // 0：删除/禁用，1，正常
      totalScore: { type: INTEGER, defaultValue: 0, field: 'total_score' }, // 总积分, 默认0
      score: { type: INTEGER, defaultValue: 0 }, // 可用积分，默认0
      defaultAddress: { type: INTEGER, field: 'default_address' }, // 默认地址id
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
