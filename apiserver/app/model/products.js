'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN, FLOAT } = app.Sequelize;
  const Products = app.model.define('products', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true }, // 订单id,自增id
    createTime: { type: DATE, field: 'create_time' }, // 时间
    updateTime: { type: DATE, field: 'update_time' }, // 更新时间
    title: STRING(500), // 标题,默认空
    cover: STRING(5000), // 封面图, 图片链接数组，默认空
    desc: STRING(255), // 商品简单描述, 默认空
    detail: STRING(5000), // 详情,图片链接数组，默认空
    price: { type: INTEGER, defaultValue: 0 }, // 单价,默认0
    score: { type: FLOAT, defaultValue: 0 }, // 评分, 待定，后端在何时更新评分状态，默认0
    count: { type: INTEGER, defaultValue: 0 }, // 销售数量,默认0
    tag: { type: INTEGER, defaultValue: 1 }, // 分类,默认1
    stock: { type: INTEGER, defaultValue: 0 }, // 库存,前后端均需判定,默认0
    isShelf: { type: BOOLEAN, defaultValue: 0, field: 'is_shelf' }, // 上下架，true，上架，默认false
    discount: { type: INTEGER, defaultValue: 0 }, // 折扣
    /*
     * 0-100，0表示积分等级折扣，100表示不折扣，不采用积分等级折扣，可采用积分兑换
     * 0~100之间，代表着可以采用积分兑换或者是活动折扣，不可以使用等级折扣
     * 折扣是三选一，等级折扣，活动折扣，永远不折扣商品
     * 可以通过这个判定是否是活动商品
     */
    isRecommend: { type: BOOLEAN, defaultValue: 0, field: 'is_recommend' }, // 推荐，true推荐，默认false
    sale: { type: INTEGER, defaultValue: 0 }, // 总销售额, 默认0
    status: { type: INTEGER, defaultValue: 1 }, // 0：删除，默认1
  });

  return Products;
};
