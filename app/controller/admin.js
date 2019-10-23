const Controller = require('./../../lib/controller')

class AdminController extends Controller {

  /**
   * 用户网站基本配置信息
   * @param {*} args 
   * @param {*} ret 
   */
  async configUpdate(args, ret) {
    // this._authByToken(args, ret)
    this.LOG.info(args.uuid, 'configGet', args)

    return ret
  }

  /**
   * 获取所有页面
   * @param {*} args 
   * @param {*} ret 
   */
  async pageUpdate(args, ret) {

  }

  /**
   * 文档列表
   * @param {*} args 
   * @param {*} ret 
   */
  async docUpdate(args, ret) {

  }


}

module.exports = AdminController