import Vue from "vue";
import Vuex from "vuex";
import Api from '../api'

Vue.use(Vuex);

const ARTICLE_LIST = 'ARTICLE_LIST'
const ARTICLE_ITEM = 'ARTICLE_ITEM'
const UP_ARTICLE = 'UP_ARTICLE'
const UP_COMMENT = 'UP_COMMENT'
const ADD_COMMENT = 'ADD_COMMENT'
const REPLY_COMMENT = 'REPLY_COMMENT'
const SET_CATEGORIES = 'SET_CATEGORIES'

export function createStore() {
  return new Vuex.Store({
    state: {
      showNavbar: true,
      params: {
        page: 1,
        page_size: 10,
        tag: '',
        category: ''
      },
      categories: [],
      articles: [],
      content: null
    },
    mutations: {
      [ARTICLE_LIST](state, data) {
        state.articles = data
      },
      [ARTICLE_ITEM](state, data) {
        console.log(data);
        state.content = data
      },
      [SET_CATEGORIES](state, data) {
        // Vue.set(state, 'categories', data)
        state.categories = data
      }
    },
    actions: {
      getArticles({commit, state}) {
        return Api  // 这里的 return 不能省，不然会变成同步代码。
          .getArticles(state.params)
          .then(res => {
            commit('ARTICLE_LIST', res.data.data)
          })
          .catch(e => {})
      },
      getArticleItem({
        commit
      }, id) {
        return Api
          .getOneArticle(id)
          .then(res => {
            console.log(res);
            commit('ARTICLE_ITEM', res.data.data)
          })
          .catch(e => {})
      },
      upArticle({
        commit
      }, id) {
        return Api
          .upArticles(id)
          .then(res => commit('UP_ARTICLE'))
          .catch(e => {})
      },
      addComments({
        commit
      }, payload) {
        return Api
          .addComments(payload)
          .then(res => {})
          .catch(e => {})
      },
      replyComments({
        commit
      }, payload) {
        return Api
          .replyComments(payload)
          .then(res => {})
          .catch(e => {})
      },
      getCategories({commit}) {
        console.log('getCate');
        return Api   
          .getCategories()
          .then(res => commit('SET_CATEGORIES', res.data.data))
          .catch(e => {})
      }
    }
  })
}
