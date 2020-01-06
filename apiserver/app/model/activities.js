'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Address = app.model.define('activities', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    createTime: { type: DATE, field: 'create_time' }, // 时间
    updateTime: { type: DATE, field: 'update_time' }, // 更新时间
    time: STRING(255), // 活动时间，'2019-08-01T12:12:12 2019-08-04T12:12:12'
    title: { type: STRING(255), defaultValue: '' }, // 活动标题，
    cover: { type: STRING(5000), defaultValue: '' }, // 封面图，
    desc: STRING(5000), // 活动的描述，
    products: STRING(255),
    detail: STRING(5000), // 详情，图片链接数组，默认空
    status: INTEGER, // 0：删除   默认1
    isShelf: BOOLEAN, // 上下架
  });

  return Address;
};
