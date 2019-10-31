const Model = require('./../../lib/model')
const Sequelize = require('sequelize')

class WebsiteModel extends Model {

  model() {
    return this.db().define(
      'user', {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        create_time: {
          type: Sequelize.BIGINT(11),
          defaultValue: parseInt(Date.now() / 1000)
        },
        update_time: {
          type: Sequelize.BIGINT(11),
          defaultValue: parseInt(Date.now() / 1000)
        },
        status: {
          type: Sequelize.INTEGER(2),
          defaultValue: 0
        },
        name: {
          type: Sequelize.STRING(64),
          defaultValue: ''
        },
        title: {
          type: Sequelize.STRING(255),
          defaultValue: ''
        },
        description: {
          type: Sequelize.STRING(1000),
          defaultValue: ''
        },
        content: {
          type: Sequelize.TEXT,
          defaultValue: ''
        },
        cover: {
          type: Sequelize.STRING(255),
          defaultValue: ''
        },
        thumb: {
          type: Sequelize.STRING(255),
          defaultValue: ''
        },
        pid: {
          type: Sequelize.BIGINT(11),
          defaultValue: 0
        },
        root_id: {
          type: Sequelize.BIGINT(11),
          defaultValue: 0
        },
        url: {
          type: Sequelize.STRING(255),
          defaultValue: 0
        },
        category: {
          type: Sequelize.STRING(12),
          defaultValue: 0
        },
        document_type: {
          type: Sequelize.STRING(12),
          defaultValue: 0
        },
        document_category: {
          type: Sequelize.STRING(32),
          defaultValue: 0
        },
        seo_title: {
          type: Sequelize.BIGINT(255),
          defaultValue: 0
        },
        seo_keywords: {
          type: Sequelize.BIGINT(255),
          defaultValue: 0
        },
        seo_description: {
          type: Sequelize.BIGINT(1000),
          defaultValue: 0
        },
        template: {
          type: Sequelize.BIGINT(32),
          defaultValue: 0
        },
        template_article: {
          type: Sequelize.BIGINT(32),
          defaultValue: 0
        },
        post_time: {
          type: Sequelize.BIGINT(11),
          defaultValue: 0
        },
        views: {
          type: Sequelize.BIGINT(11),
          defaultValue: 0
        },
        sort: {
          type: Sequelize.BIGINT(11),
          defaultValue: 0
        },
      }, {
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        freezeTableName: true,
        tableName: 't_website'
      }
    );
  }
}

module.exports = WebsiteModel