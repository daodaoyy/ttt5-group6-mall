const Controller = require('egg').Controller;

class HomeController extends Controller {
  async shop() {
    await this.ctx.render('shop.html');
  }
}

module.exports = HomeController;
