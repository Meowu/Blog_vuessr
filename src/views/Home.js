import VArticle from './ArticleCard'
import VList from '../components/List'
import VChip from '../components/Chip/VChip'
import Api from '../api'
import './home.css'
export default {
  name: 'v-home',
  asyncData({store}) {
    return Promise.all([store.dispatch('getArticles'), store.dispatch('getCategories'), store.dispatch('getTags')])
    // return store.dispatch('getArticles')
  },
  data() {
    return {
      category: [
        { name: "Node.js", number: 14, id: "1" },
        { name: "Python", number: 6, id: "2" },
        { name: "Rust", number: 10, id: "3" }
      ],
    }
  },
  // created() {
  //   this.$store.dispatch('getArticles')
  // },
  computed: {
    articles() {
      return this.$store.state.articles
    },
    categories() {
      return this.$store.state.categories
    },
    tags() {
      return this.$store.state.tags
    }
  },
  methods: {
    genSidebar(h, cates) {
      return h('sidebar', {staticClass: 'sidebar'}, [h(VList, {props: {list: cates, title: '分类查看'}}), this.genTags(h)])
    },
    genArticles(h, articles) {
      // const articles = [1, 2]
      const children = articles.map(article => h(VArticle, {props: {meta: article}}))
      return h('section', {staticClass: 'articles'}, children)
    },
    genTags(h) {
      const children = this.tags.map(tag => h(VChip, {
        props: {tag: tag},
        on: {
          click: () => {
            this.$store.commit('SET_PARAMS', {page: 1, page_size: 15, tag: tag.id, category: ''})
            this.$store.dispatch('getArticles')
          }
        }
      }))
      const title = h('h3', {staticClass: 'taglist-title'}, '标签列表')
      const list = h('div', {staticClass: 'taglist-body'}, children)
      return h('div', {staticClass: 'taglist'}, [title, list])
    }
  },
  render(h) {
    return h('main', {staticClass: 'main'}, [this.genArticles(h, this.articles), this.genSidebar(h, this.categories)])
  }
}