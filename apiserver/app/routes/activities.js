'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminAuth = app.middleware.adminAuth();

  // 用户端获取活动列表
  router.get('/api/v1/activities', controller.v1.clientActivites.getList);
  // 用户端获取活动详情
  router.get('/api/v1/activity/:id', controller.v1.clientActivites.getInfo);
  // 管理员添加活动
  router.post('/api/v1/admin/activity', adminAuth, controller.v1.manageActivites.createActivity);
  // 管理员删除活动
  router.delete('/api/v1/admin/activity/:id', adminAuth, controller.v1.manageActivites.deleteActivity);
  // 管理员上下架活动
  router.put('/api/v1/admin/activity/:id', adminAuth, controller.v1.manageActivites.updateActivity);
  // 管理员获取活动列表
  router.get('/api/v1/admin/activity', adminAuth, controller.v1.manageActivites.getList);
  // 管理员获取活动详情
  router.get('/api/v1/admin/activity/:id', adminAuth, controller.v1.manageActivites.getInfo);
  // 管理员编辑活动
  router.put('/api/v1/admin/activityInfo/:id', adminAuth, controller.v1.manageActivites.updateActivityProducts);
};
