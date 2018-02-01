import VArticle from './ArticleCard'
export default {
  name: 'v-home',
  asyncData() {

  },
  methods: {},
  render(h) {
    const articles = [1, 2, 3, 4, 5]

    const children = articles.map(article => h(article))
    return h()
  }
}