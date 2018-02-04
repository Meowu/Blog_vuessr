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

export function createStore() {
  return new Vuex.Store({
    state: {
      showNavbar: true,
      params: {
        page: 1,
        page_size: 10,
        tag: '',
        categroy: ''
      },
      articles: [],
      content: null,
    },
    mutations: {
      [ARTICLE_LIST](state, data) {
        state.articles = data
      },
      [ARTICLE_ITEM](state, data) {
        state.content = data
      },
      
    },
    actions: {
      async getArticles({commit, state}) {
        try {
          const res = await Api.getArticles(state.params)
          commit('ARTICLE_LIST', res.data)
        } catch (error) {
          
        }
      },
      async getArticleItem({commit}, id) {
        try {
          const res = await Api.getOneArticle(id)
          commit('ARTICLE_ITEM', res.data)
        } catch (e) {
          
        }
      },
      async upArticle({commit}, id) {
        try {
          const res = await Api.upArticles(id)
          commit('UP_ARTICLE')
        } catch (e) {
          
        }
      },
      async addComments({commit}, payload) {
        try {
          const res = await Api.addComments(payload)
        } catch (e) {
          
        }
      },
      async replyComments({commit}, payload) {
        try {
          const res = await Api.replyComments(payload)
        } catch (e) {
          
        }
      }
    }
  });
}
