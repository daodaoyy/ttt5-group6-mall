'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 会员/用户相关
  require('./routes/users')(app);
  // 商品管理相关
  require('./routes/products')(app);
  // 订单管理相关
  require('./routes/orders')(app);
  // 活动管理相关
  require('./routes/activities')(app);
  // 购物车相关
  require('./routes/shoppingcart')(app);
  // 基础设施
  require('./routes/basic')(app);
  // 默认路由
  require('./routes/home')(app);
};
