'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();

  // 存放购物车
  router.post('/api/v1/shoppingcarts', auth, controller.v1.shoppingcart.createShoppingCart);
  // 获取购物车
  router.get('/api/v1/shoppingcarts', auth, controller.v1.shoppingcart.getShoppingCart);
};
