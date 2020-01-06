/*
 * @Author: yifeng.tao 
 * @Date: 2019-10-13 09:34:46 
 * @Last Modified by: yifeng.tao
 * @Last Modified time: 2019-10-15 09:51:50
 */

const Service = require('egg').Service;

class manageapiServer extends Service {
	/**
	 * return object
	 * @param {string} url 
	 * @param {object} payload 
	 * @param {string} method 
	 * @param {object} Authorization 
	 */
	async req(url, payload = {}, method = 'post', Authorization) {
		const BASEURL = this.config.api.url;
		const realUrl = `${BASEURL}${url?url:''}`;
		this.ctx.logger.info('================================================');
		this.ctx.logger.info(method);
		this.ctx.logger.info(realUrl);
		this.ctx.logger.info(payload);
		this.ctx.logger.info(Authorization);

		console.log('MDTHOD',realUrl);

		console.log(payload)
		
		const result = await this.app.curl(realUrl, {
			method,
			data: payload,
			contentType: 'json',
			dataType: 'json',
			headers:{
        		Authorization
			},
			timeout: 10000,
		});

		console.log(result);
		
		this.ctx.logger.info('[Response]', result.status);
		return result.data;
	}

	/**
	 * return object
	 * @param {object} data 
	 * @param {string} Authorization 
	 */
	async formReq(data, Authorization) {
    const { url, method, headers, data } = data;
    const BASEURL = this.config.api.url;
		const realUrl = `${BASEURL}${url?url:''}`;

    this.ctx.logger.info(data);

    const result = await this.app.curl(realUrl, {
      method,
      data,
      headers: {
        Authorization,
        'content-type': 'application/x-www-form-urlencoded'
      },
      timeout: 10000
    });

    this.ctx.logger.info('[Response]', result.status);
    this.ctx.logger.info(result.data);
    return result.data;
  }
}

module.exports = manageapiServer;