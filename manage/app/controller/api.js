/*
 * @Author: yifeng.tao 
 * @Date: 2019-10-13 09:34:28 
 * @Last Modified by: yifeng.tao
 * @Last Modified time: 2019-10-14 14:53:48
 */

const Controller = require('egg').Controller;

class Api extends Controller {
	async manageapi() {
		console.log('begin============')
		const USERTOKEN = this.ctx.cookies.get('user_token', {
			signed: false
		});
		const Authorization = 'bearer ' + USERTOKEN
		const method = this.ctx.request.method;
		let url, payload;
		if (method === 'GET') {
			url = this.ctx.query.url;
			console.log('======================',this.ctx.query.data)
			payload = JSON.parse(this.ctx.query.data);
		} else {
			url = this.ctx.request.body.url;
			payload = this.ctx.request.body.data;
		};
		if(url === '/api/v1/admin/users/logout') {
			this.ctx.cookies.set('user_token', null);
			this.ctx.body = {
				'message': '退出成功',
				'status': 200,
			}
		} else {
			const result = await this.ctx.service.manageapiServer.req(url, payload, method, Authorization);
			console.log(result)
			// 如果是登陆请求，则保存返回的token
			if (url === '/api/v1/admin/users/login' && result.status === 200) {
				this.ctx.cookies.set('user_token', result.data.token, {
					httpOnly: false,
					maxAge: 1000 * 3600 * 24
				})
			}
			this.ctx.set('Content-Type', 'application/json');
			this.ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');
			this.ctx.set('Expirse', 0);
			this.ctx.body = result;	
		}
	}
	async manageFormApi() {
		const data = this.ctx.require.body.data;
		const USERTOKEN = ctx.cookies.get('user_token', {
			signed: false
		});
		const Authorization = 'bearer ' + USERTOKEN
		const result = await this.ctx.service.manageapiService.formReq(data, Authorization);
		this.ctx.set('Content-Type', 'application/json');
		this.ctx.set('Cache-Control', 'no-store', 'must-revalidate');
		this.ctx.set('Expires', 0);
		this.ctx.body = result;
	}
}

module.exports = Api;