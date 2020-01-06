'use strict';

/**
 * @param app.middleware authorization
 */

module.exports = () => {
  return async function adminAuth(ctx, next) {
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

    if (!vf.hasOwnProperty('username') || !vf.hasOwnProperty('id') || !vf.hasOwnProperty('role')) {
      ctx.returnBody(401, false, null, '非法认证');
      return;
    }

    if (vf.exp < Date.now()) {
      ctx.returnBody(403, false, null, '认证错误或者过期');
      return;
    }

    const user = await ctx.model.AdminUser.findOne({ where: { username: vf.username } });
    // 赋予ctx current_user参数
    if (!user || user.username !== vf.username || user.id !== vf.id || user.role !== vf.role) {
      ctx.returnBody(401, false, null, '非法认证');
      return;
    }

    if (!user.status) {
      ctx.returnBody(401, false, null, '账号已被禁用或销户');
      return;
    }

    ctx.current_user = {
      username: vf.username,
      id: vf.id,
      role: vf.role,
    };

    await next();
  };
};
