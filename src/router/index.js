import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'

Vue.use(Router)

const createList = id => () => import('../views/CreateListView').then(m => m.default(id))
// 类似于 createApp，我们也需要给每个请求一个新的 router 实例，所以文件导出一个 createRouter 函数:

const ArticlePage = () => import('../views/ArticlePage.js')

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/all',
        component: Hello
      },
      {
        path: '/good',
        component: createList('good')
      },
      {
        path: '/share',
        component: createList('share')
      },
      {
        path: '/ask',
        component: createList('ask')
      },
      {
        path: '/job',
        component: createList('job')
      },
      {
        path: '/articles/:id',
        component: ArticlePage
      },
      {
        path: '/',
        redirect: '/all'
      },
    ]
  })
}