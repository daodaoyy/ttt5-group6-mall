/*
 * @Author: Yifeng Tao 
 * @Date: 2019-09-12 15:17:18 
 * @Last Modified by: yifeng.tao
 * @Last Modified time: 2019-10-16 11:00:21
 */
module.exports = app => {
  const { router, controller } = app;
  const anthenticationMiddleware = app.middleware.anthentication({},app);

  // api request proxy
  router.all('/manageapi',anthenticationMiddleware,controller.api.manageapi);
  router.all('/manageFormApi', anthenticationMiddleware,controller.api.manageFormApi);

  // apps
  router.get('/(/?)**', controller.home.manage);
}