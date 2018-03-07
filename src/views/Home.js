import VArticle from './ArticleCard'
import VList from '../components/List'
import VChip from '../components/Chip/VChip'
import VLoading from '../components/Loading'
import Api from '../api'
export default {
  name: 'v-home',
  asyncData({store}) {
    // store.commit('SET_PARAMS', {page: 1, page_size: 10, tag: '', category: ''})
    console.log('asyncData');
    return Promise.all([store.dispatch('getArticles'), store.dispatch('getCategories'), store.dispatch('getTags')])
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
      return h('aside', {staticClass: 'sidebar',
      //   style: {
      //   flex: '1 1 25%',
      //   paddingLeft: '40px',
      // }
    }, [h(VList, {props: {list: cates, title: '分类查看'}}), this.genTags(h)])
    },
    genArticles(h, articles) {
      // const articles = [1, 2]
      const children = articles.map(article => h(VArticle, {props: {meta: article}}))
      children.push(h(VLoading, {
        on: {
          click: () => {
            this.$bar.start()
            this.$store.commit('SET_LOAD')
            this.$store.dispatch('getArticles').then(_ => this.$bar.finish())
          }
        }
      }))
      return h('section', {staticClass: 'articles', style: {
        width: '75%',
        flex: '1 1 75%'
      }}, children)
    },
    genTags(h) {
      const children = this.tags.map(tag => h(VChip, {
        props: {tag: tag},
        on: {
          click: () => {
            this.$bar.start()
            this.$store.commit('SET_PARAMS', {page: 1, page_size: 15, tag: tag.id, category: ''})
            this.$store.dispatch('getArticles').then(() => {
              this.$bar.finish()
              this.$router.push(`/articles/tags/${tag.name.toLowerCase()}`)
            })
          }
        }
      }))
      const title = h('h3', {staticClass: 'tag-list-title'}, '标签列表')
      const list = h('div', {staticClass: 'tag-list-body'}, children)
      return h('div', {staticClass: 'tag-list'}, [title, list])
    }
  },
  render(h) {
    return h('main', {staticClass: 'main',
    // style: {
    //   padding: '.33333rem',
    //   display: 'flex',
    //   flexFlow: 'row nowrap',
    //   justifyContent: 'space-around',
    //   alignItems: 'flex-start'
    // }
  }, [this.genArticles(h, this.articles), this.genSidebar(h, this.categories)])
  }
}