module.exports = () => {
  return async function agentHandler(ctx, next) {
    const mobileReg = /(Android|android|iPhone|iphone|BlackBerry|PlayBook|BB10|Symbian|IEMobile|Kindle|Maemo|UCWEB)/;
    if (!mobileReg.test(ctx.request.headers['user-agent'])) {
      ctx.redirect('https://m.luckincoffee.com');
      return;
    }
    await next();
  };
};
