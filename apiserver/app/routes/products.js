'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();
  const adminAuth = app.middleware.adminAuth();

  // 获取商品列表
  router.get('/api/v1/admin/products', adminAuth, controller.v1.manageProducts.getProductsList);
  // 添加商品
  router.post('/api/v1/admin/products', adminAuth, controller.v1.manageProducts.addProducts);
  // 删除商品
  router.delete('/api/v1/admin/products/:id', adminAuth, controller.v1.manageProducts.deleteProducts);
  // 修改商品
  router.put('/api/v1/admin/products/:id', adminAuth, controller.v1.manageProducts.editProducts);
  // 商品详情
  router.get('/api/v1/admin/products/:id', adminAuth, controller.v1.manageProducts.detailProducts);

  // 客户端获取商品列表
  router.get('/api/v1/products', controller.v1.clientProducts.getProductsList);
  // 客户端获取商品详情
  router.get('/api/v1/products/:id', controller.v1.clientProducts.detailProducts);
  // 客户端生成商品评价
  router.post('/api/v1/products/appraisals', auth, controller.v1.clientProducts.editProductsAppraisal);
  // 客户端获取商品评价列表
  router.get('/api/v1/products/:id/appraisals', controller.v1.clientProducts.getProductsAppraisal);
};
