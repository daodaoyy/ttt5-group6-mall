const Controller = require('egg').Controller;

class ErrorController extends Controller {
  // TODO: make it more beautiful
  fourZeroOne() {
    this.ctx.status = 401;
    this.ctx.body = 'Unauthorized';
  }
}

module.exports = ErrorController;
