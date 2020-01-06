'use strict';

/**
 * @param app.middleware authorization
 */

module.exports = () => {
  return async function auth(ctx, next) {
    const authorization = ctx.request.headers.authorization;
    if (!authorization) {
      ctx.returnBody(401, false, null, '请登录');
      return;
    }

    const token = authorization.slice(7);
    const vf = ctx.app.jwt.decode(token, ctx.app.config.jwt.secret);

    if (!vf) {
      ctx.returnBody(403, false, null, '认证错误或者过期');
      return;
    }

    if (!vf.hasOwnProperty('phone') || !vf.hasOwnProperty('id')) {
      ctx.returnBody(401, false, null, '非法认证');
      return;
    }

    if (vf.exp < Date.now()) {
      ctx.returnBody(403, false, null, '认证错误或者过期');
      return;
    }

    const user = await ctx.model.User.findOne({ where: { phone: vf.phone } });
    // 赋予ctx current_user参数
    if (!user || user.phone !== vf.phone || user.id !== vf.id) {
      ctx.returnBody(401, false, null, '非法认证');
      return;
    }

    if (!user.status) {
      ctx.returnBody(401, false, null, '账号已被禁用或销户');
      return;
    }

    ctx.current_user = {
      phone: vf.phone,
      id: vf.id,
    };

    await next();
  };
};
