'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Zhenziyun = app.model.define('vcodes', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    createTime: { type: DATE, field: 'create_time' }, // 创建日期
    updateTime: { type: DATE, field: 'update_time' },
    phone: STRING(11), // 手机号
    vcode: INTEGER,
    status: { type: INTEGER, defaultValue: 1 }, // 是否删除
  });
  return Zhenziyun;
};
