import VArticle from './ArticleCard'
import VList from '../components/List'
import Api from '../api'
import './home.css'
export default {
  name: 'v-home',
  asyncData({store}) {
    // return Promise.all([store.dispatch('getArticles'), store.dispatch('getCategories')])
    return store.dispatch('getArticles')
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
    }
  },
  methods: {
    genSidebar(h, cates) {
      return h('sidebar', {staticClass: 'sidebar'}, [h(VList, {props: {list: cates, title: '分类查看'}})])
    },
    genArticles(h, articles) {
      // const articles = [1, 2]
      const children = articles.map(article => h(VArticle))
      return h('section', {staticClass: 'articles'}, children)
    }
  },
  render(h) {
    return h('main', {staticClass: 'main'}, [this.genArticles(h, this.articles), this.genSidebar(h, this.categories)])
  }
}