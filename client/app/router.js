module.exports = app => {
  const { router, controller } = app;
  // router.get('/shop(/?)**', controller.home.shop);
  router.get('/**', controller.home.shop);
};
