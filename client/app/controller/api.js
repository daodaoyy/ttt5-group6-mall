const Controller = require('egg').Controller;

class Api extends Controller {
  async scgwapi() {
    const { authorization } = this.ctx.request.header;

    const method = this.ctx.request.method;
    let url;
    let payload;
    if (method === 'GET') {
      url = this.ctx.query.url;
      payload = JSON.parse(this.ctx.query.payload);
    } else {
      url = this.ctx.request.body.url;
      payload = this.ctx.request.body.payload;
    }
    const result = await this.ctx.service.scgwapi.req(url, payload, method, { authorization });
    this.ctx.set('Content-Type', 'application/json');
    this.ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    this.ctx.set('Expires', 0);
    this.ctx.body = result;
  }

  async scgwFormApi() {
    const { payload } = this.ctx.request.body;
    const result = await this.ctx.service.scgwapi.formReq(payload);
    this.ctx.set('Content-Type', 'application/json');
    this.ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    this.ctx.set('Expires', 0);
    this.ctx.body = result;
  }
}

module.exports = Api;
