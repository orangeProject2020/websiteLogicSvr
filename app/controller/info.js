const Controller = require('./../../lib/controller')
const Op = require('sequelize').Op

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
  async getDataList(args, ret) {
    this.LOG.info(args.uuid, 'getDataList', args)

    let category = args.category || 'category'
    let status = args.status || ''
    let pid = args.pid || ''
    let page = args.page || 1
    let limit = args.limit || 0

    let opts = {}
    let map = {}
    map.category = category

    if (status !== '') {
      map.status = status
    } else {
      map.status = {
        [Op.gte]: 0
      }
    }

    if (pid !== '') {
      map.pid = pid
    }

    if (category === 'document') {
      let type = args.type || 'article'
      map.document_type = type

      if (type === 'article' && limit > 0) {
        opts.offset = (page - 1) * limit
        opts.limit = limit
      }
    }
    this.LOG.info(args.uuid, 'getDataList map', map)

    let websiteModel = new this.MODELS.websiteModel

    opts.where = map
    opts.order = [
      ['sort', 'asc'],
      ['create_time', 'desc']
    ]
    this.LOG.info(args.uuid, 'getDataList opts', opts)
    let data = await websiteModel.model().findAndCountAll(opts)
    this.LOG.info(args.uuid, 'getDataList data', data)
    ret.data = data

    return ret

  }

  /**
   * 获取页面信息
   * @param {*} args 
   * @param {*} ret 
   */
  async getDataDetail(args, ret) {
    this.LOG.info(args.uuid, 'getDataDetail', args)
    let websiteModel = new this.MODELS.websiteModel

    let id = args.id || 0
    let url = args.url || ''

    let map = {}
    if (id) {
      map.id = id
    }

    if (url) {
      map.url = url
    }
    this.LOG.info(args.uuid, 'getDataDetail map', map)

    let data = await websiteModel.model().findOne({
      where: map
    })
    this.LOG.info(args.uuid, 'getDataDetail data', data)
    ret.data = data
    return ret

  }


}

module.exports = InfoController