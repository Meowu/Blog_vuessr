import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'

Vue.use(Router)

const createList = id => () => import('../views/CreateListView').then(m => m.default(id))
// 类似于 createApp，我们也需要给每个请求一个新的 router 实例，所以文件导出一个 createRouter 函数:
const Home = () => import('../views/Home.js')
const ArticlePage = () => import('../views/ArticlePage.js')
const ArchivePage = () => import('../views/ArchivePage.js')
const AboutPage = () => import('../views/AboutPage.js')

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/articles/tags/:tag',
        component: Home
      },
      {
        path: '/articles/categories/:category',
        component: Home
      },
      {
        path: '/archives',
        component: ArchivePage
      },
      {
        path: '/articles/:id',
        component: ArticlePage
      },
      {
        path: '/about',
        component: AboutPage
      },
      // {
      //   path: '/aboutme',
      //   component: AboutPage
      // },
      // {
      //   path: '*',
      //   redirect: '/all'
      // },
    ]
  })
}