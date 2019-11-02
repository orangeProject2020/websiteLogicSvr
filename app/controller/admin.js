const Controller = require('./../../lib/controller')
const Op = require('sequelize').Op

class AdminController extends Controller {

  /**
   * 用户网站基本配置信息
   * @param {*} args 
   * @param {*} ret 
   */
  async dataUpdate(args, ret) {
    // this._authByToken(args, ret)
    this.LOG.info(args.uuid, 'dataUpdate', args)

    let websiteModel = new this.MODELS.websiteModel
    let id = args.id || ''
    if (!id) {
      ret.code = 1
      ret.message = 'id err'
      return ret
    }

    let data = await websiteModel.model().findByPk(id)
    this.LOG.info(args.uuid, 'dataUpdate data', data)
    if (!data) {
      ret.code = 1
      ret.message = '查找数据失败'
      return ret
    }

    data.name = args.name || ''
    data.title = args.title || ''
    data.description = args.description || ''
    data.cover = args.cover || ''
    data.thumb = args.thumb || ''
    data.pid = args.pid || 0
    data.category = args.category || 'category'
    data.document_type = args.document_type || ''
    data.document_category = args.document_category || ''
    data.seo_title = args.seo_title || args.title || ''
    data.seo_keywords = args.seo_keywords || ''
    data.seo_description = args.seo_description || args.description || ''
    data.template = args.template || ''
    data.template_article = args.template_article || ''
    data.post_time = args.post_time || 0
    data.view = args.view || 0
    data.sort = args.sort || 0
    data.url = args.url || ''

    if (args.hasOwnProperty('content')) {
      data.content = args.content || ''
    }

    if (args.hasOwnProperty('status')) {
      data.status = args.status
    }

    this.LOG.info(args.uuid, 'dataUpdate data', data)

    let find = await websiteModel.model().findOne({
      where: {
        id: {
          [Op.ne]: id
        },
        [Op.or]: {
          title: data.title,
          name: data.name
        }
      }
    })
    if (find) {
      ret.code = 1
      ret.message = '请不要重复添加'
      return ret
    }

    let url = '/'
    let category = data.category
    let parent = null
    if (data.pid > 0) {
      parent = await websiteModel.model().findByPk(data.pid)
      this.LOG.info(args.uuid, 'dataUpdate parent', parent)
      if (!parent) {
        ret.code = 1
        ret.message = '上级栏目查找错误'
        return ret
      }

      url = parent.url
      data.root_id = parent.root_id || data.root_id
    }

    if (category === 'category') {
      url += data.name + '/'
    } else if (category === 'document') {
      if (!parent) {
        ret.code = 1
        ret.message = '文档所属栏目查找错误'
        return ret
      }
      let documentType = data.document_type
      if (documentType === 'article') {
        url += data.id + '.html'
        data.template = parent.template_article || ''
      } else if (documentType === 'url') {
        url = data.url
      }
    }

    if (!data.url) {
      data.url = url
    }

    this.LOG.info(args.uuid, 'dataUpdate data', data)

    let result = await data.save()
    this.LOG.info(args.uuid, 'dataUpdate result', result)
    if (!result) {
      ret.code = 1
      ret.message = '更新失败'
      return ret
    }

    ret.data = data

    return ret
  }

  async dataCreate(args, ret) {
    this.LOG.info(args.uuid, 'dataCreate', args)

    let websiteModel = new this.MODELS.websiteModel

    let data = {}
    data.name = args.name || ''
    data.title = args.title || ''
    data.description = args.description || ''
    data.cover = args.cover || ''
    data.thumb = args.thumb || ''
    data.pid = args.pid || 0
    data.category = args.category || 'category'
    data.document_type = args.document_type || ''
    data.document_category = args.document_category || ''
    data.seo_title = args.seo_title || args.title || ''
    data.seo_keywords = args.seo_keywords || ''
    data.seo_description = args.seo_description || args.description || ''
    data.template = args.template || ''
    data.template_article = args.template_article || ''
    data.post_time = args.post_time || 0
    data.view = args.view || 0
    data.sort = args.sort || 0
    data.url = args.url || ''

    if (args.hasOwnProperty('status')) {
      data.status = args.status
    }
    if (args.hasOwnProperty('content')) {
      data.content = args.content || ''
    }
    this.LOG.info(args.uuid, 'dataCreate data', data)

    // 判断重复
    let find = await websiteModel.model().findOne({
      where: {
        [Op.or]: {
          title: data.title,
          name: data.name
        }
      }
    })
    if (find) {
      ret.code = 1
      ret.message = '请不要重复添加'
      return ret
    }

    let url = '/'
    let category = data.category
    let parent = null
    if (data.pid > 0) {
      parent = await websiteModel.model().findByPk(data.pid)
      this.LOG.info(args.uuid, 'dataCreate parent', parent)
      if (!parent) {
        ret.code = 1
        ret.message = '上级栏目查找错误'
        return ret
      }

      url = parent.url
      data.root_id = parent.root_id

    }

    if (category === 'category') {
      url += data.name + '/'
      if (!data.url) {
        data.url = url
      }

    }
    this.LOG.info(args.uuid, 'dataCreate data', data)

    let item = await websiteModel.model().create(data)
    this.LOG.info(args.uuid, 'dataCreate data', data)
    if (!item) {
      ret.code = 1
      ret.message = '添加失败'
      return ret
    }
    // 更新文档url
    if (category === 'document') {
      if (!parent) {
        ret.code = 1
        ret.message = '文档所属栏目查找错误'
        return ret
      }

      let documentType = data.document_type
      if (documentType === 'article') {
        url += item.id + '.html'

        item.template = parent.template_article || ''
      } else if (documentType === 'url') {
        url = data.url
      }
      item.url = args.url || url
    }

    // 更新root_id
    if (data.pid == 0) {
      item.root_id = item.id
    }

    await item.save()
    this.LOG.info(args.uuid, 'dataCreate data', data)

    ret.data = item
    return ret

  }

}

module.exports = AdminController