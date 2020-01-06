'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminAuth = app.middleware.adminAuth();

  // 获取七牛token
  router.post('/api/v1/basic/qiniu', adminAuth, controller.v1.qiniu.getToken);
  // 获取短信验证码
  router.post('/api/v1/sms/code', controller.v1.zhenziyun.getVerification);
  // 验证短信验证码
  router.put('/api/v1/sms/code', controller.v1.zhenziyun.veryCode);
};
