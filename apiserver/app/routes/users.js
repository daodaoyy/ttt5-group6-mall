'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();
  const adminAuth = app.middleware.adminAuth();
  const superAdminAuth = app.middleware.superAdminAuth();

  // 会员注册
  router.post('/api/v1/account/register', controller.v1.account.register);
  // 会员登陆
  router.post('/api/v1/account/login', controller.v1.account.login);
  // 会员忘记密码
  router.post('/api/v1/account/forget', controller.v1.account.forget);

  // 修改密码
  router.put('/api/v1/users/password', auth, controller.v1.userInfo.password);
  // 获取个人信息
  router.get('/api/v1/users/info', auth, controller.v1.userInfo.getInfo);
  // 修改个人信息
  router.put('/api/v1/users/info', auth, controller.v1.userInfo.putInfo);

  // 更换绑定手机
  router.put('/api/v1/users/phone', auth, controller.v1.userInfo.putPhone);

  // 获取积分等级
  router.get('/api/v1/users/score', auth, controller.v1.userInfo.getScore);

  // 获取地址列表
  router.get('/api/v1/users/addresses', auth, controller.v1.address.getAddress);
  // 添加地址
  router.post('/api/v1/users/addresses', auth, controller.v1.address.postAddress);
  // 修改地址
  router.put('/api/v1/users/addresses/:id', auth, controller.v1.address.putAddress);
  // 删除地址
  router.delete('/api/v1/users/addresses/:id', auth, controller.v1.address.delAddress);

  // 添加工作人员
  router.post('/api/v1/admin/users/join', superAdminAuth, controller.v1.adminUser.join);
  // 登录
  router.post('/api/v1/admin/users/login', controller.v1.adminUser.login);
  // 编辑管理员
  router.put('/api/v1/admin/users', superAdminAuth, controller.v1.adminUser.putUser);
  // 删除管理员
  router.delete('/api/v1/admin/users/:id', superAdminAuth, controller.v1.adminUser.delUser);
  // 获取管理员列表
  router.get('/api/v1/admin/users', superAdminAuth, controller.v1.adminUser.getUser);

  // 获取会员列表/搜索会员
  router.get('/api/v1/admin/members', adminAuth, controller.v1.adminMember.getMembers);
  // 获取会员详情
  router.get('/api/v1/admin/members/:id', adminAuth, controller.v1.adminMember.getMemberDetail);
  // 修改会员状态
  router.put('/api/v1/admin/members', superAdminAuth, controller.v1.adminMember.delMember);
};

