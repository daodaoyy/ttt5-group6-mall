'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  const auth = app.middleware.auth();
  const adminAuth = app.middleware.adminAuth();

  // 管理员修改订单状态
  router.put('/api/v1/admin/orders', adminAuth, controller.v1.manageOrder.updateOrderInfo);
  // 确认退货
  router.put('/api/v1/admin/orders/:id', adminAuth, controller.v1.manageOrder.refundOrder);
  // 管理员获取订单列表
  router.get('/api/v1/admin/orders', adminAuth, controller.v1.manageOrder.getOrderList);
  // 管理员获取订单详情
  router.get('/api/v1/admin/orders/:id', adminAuth, controller.v1.manageOrder.getOrderInfo);

  // 创建订单
  router.post('/api/v1/orders', auth, controller.v1.order.createOrder);
  // 获取订单详情
  router.get('/api/v1/orders/:id', auth, controller.v1.order.getOrderDetail);
  // 修改订单状态
  router.put('/api/v1/orders', auth, controller.v1.order.changeOrderStatus);
  // 删除订单状态
  router.delete('/api/v1/orders/:id', auth, controller.v1.order.delOrder);
  // 获取订单列表
  router.get('/api/v1/orders', auth, controller.v1.order.getOrderList);
  // 退货
  router.put('/api/v1/orders/:id', auth, controller.v1.order.refundOrder);
};
