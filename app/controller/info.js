const Controller = require('./../../lib/controller')

class InfoController extends Controller {

  /**
   * 用户网站基本配置信息
   * @param {*} args 
   * @param {*} ret 
   */
  async config(args, ret) {
    // this._authByToken(args, ret)
    this.LOG.info(args.uuid, 'config', args)

    ret.data = {
      'name': '项目名称'
    }
    return ret
  }

  /**
   * 获取所有页面
   * @param {*} args 
   * @param {*} ret 
   */
  async pageList(args, ret) {

  }

  /**
   * 获取页面信息
   * @param {*} args 
   * @param {*} ret 
   */
  async pageDetail(args, ret) {

  }

  /**
   * 文档列表
   * @param {*} args 
   * @param {*} ret 
   */
  async docList(args, ret) {

  }

  /**
   * 文档详情
   * @param {*} args 
   * @param {*} ret 
   */
  async docDetail(args, ret) {

  }

}

module.exports = InfoController