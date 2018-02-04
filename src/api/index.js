import Api from './api'
import APPLICATION_JSON from './config'

export default {
  /**
   * 获取文章列表或者通过标签、分类筛选列表
   * @param {Number} page 
   * @param {Number} page_size 
   * @param {String} tag 
   * @param {String} category 
   */
  getArticles({page=1, page_size=10, tag, category}) {
    const data = {
      url: '/articles',
      params: {
        page,
        page_size,
        tag,
        category
      }
    }
    return Api.get(data)
  },

  /**
   * 获取单篇文章
   * @param {String} id 
   */
  getOneArticle(id) {
    const data = {
      url: `/articles/${id}`,
      params: {}
    }
    return Api.get(data)
  },

  /**
   * 点赞文章
   * @param {*String} id 
   */
  upArticles(id) {
    const data = {
      url: `/articles/${id}`,
      params: {}
    }
    return Api.put(data)
  },

  upComments(id) {
    const data = {
      url: `/comments/${id}`,
      params: {}
    }
    return Api.put(data)
  },

  /**
   * 
   * @param {*Object} body 
   * name,email,site,content,avatar,articleId || commentId
   */
  addComments(body) {
    const data = {
      headers: APPLICATION_JSON,
      url: '/comments/new',
      params: body
    }
    return Api.post(data)
  },

  replyComments(body) {
    const data = {
      headers: APPLICATION_JSON,
      url: '/comments/new',
      params: body
    }
    return Api.post(data)
  },

  getCategories() {
    const data = {
      url: '/categories',
      params: {}
    }
    return Api.get(data)
  }
  // replyComments(body) 
}