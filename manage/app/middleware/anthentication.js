/*
 * @Author: Yifeng Tao 
 * @Date: 2019-09-18 10:32:31 
 * @Last Modified by: yifeng.tao
 * @Last Modified time: 2019-10-14 11:03:51
 */
module.exports = (opt, app) => {
  return async function init(ctx, next) {
    if (ctx.request.body.url === '/api/v1/admin/users/login') {
      await next();
    } else {
      // 依据token判断用户是否登录
      const USERTOKEN = ctx.cookies.get('user_token', {
        signed: false
      });
      if (USERTOKEN) {
        await next();
      } else {
        ctx.body = {
          'status': 403,
          'message': '请先登录！'
        }
      }
    }
  }
}