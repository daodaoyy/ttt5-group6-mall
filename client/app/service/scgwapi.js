const Service = require('egg').Service;

class SCGatewayApiService extends Service {

  async req(url, payload = {}, method = 'post', extraHeaders) {
    const config = this.ctx.app.config.scgwapi;
    const realurl = `${config.url}${url ? url : ''}`;

    this.ctx.logger.info('================================================');
    this.ctx.logger.info(method);
    this.ctx.logger.info(realurl);
    this.ctx.logger.info(payload);
    this.ctx.logger.info(extraHeaders);

    const result = await this.app.curl(realurl, {
      method,
      dataAsQueryString: method.toLowerCase() === 'get',
      data: payload,
      contentType: 'json',
      dataType: 'json',
      headers: Object.assign({}, { 'gw-token': config.gwtoken }, extraHeaders),
      timeout: 10000,
    });

    this.ctx.logger.info('[Response]', result.status);
    return result.data;
  }

  async formReq(payload) {
    const { url, method, data } = payload;
    const config = this.ctx.app.config.scgwapi;
    const realurl = `${config.url}${url ? url : ''}`;

    this.ctx.logger.info(payload);

    const result = await this.app.curl(realurl, {
      method,
      data,
      headers: {
        'gw-token': config.gwtoken,
        'content-type': 'application/x-www-form-urlencoded',
      },
      timeout: 10000,
    });

    this.ctx.logger.info('[Response]', result.status);
    this.ctx.logger.info(result.data);
    return result.data;
  }

}

module.exports = SCGatewayApiService;
