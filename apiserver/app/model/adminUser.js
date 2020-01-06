'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const AdminUser = app.model.define('adminUser', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING(76), primaryKey: true }, // 用户名
    createTime: { type: DATE, field: 'create_time' }, // 创建日期
    updateTime: { type: DATE, field: 'update_time' },
    password: STRING(76),
    status: { type: INTEGER, defaultValue: 1 }, // 状态，
    // 0：删除，1，正常,2禁用
    role: { type: INTEGER, defaultValue: 0 }, // 权限 0,普通管理，1，超级管理
  });

  return AdminUser;
};
