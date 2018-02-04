import VComment from '../components/Comment'
import VIcon from '../components/VIcon'
import VReaction from '../components/UserReaction'
import './article.css'
import './github-markdown.css'
export default {
  name: "v-article-page",
  asyncData({store, route: {params: {id}}}) {
    return store.dispatch('getArticleItem', id)
  },
  data() {
    return {
      // comments:
    }
  },
  computed: {
    article() {
      return this.$store.state.content
    },
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    formatDate(timestamp, format='yyyy-MM-dd HH:mm') {
      if (!Number(timestamp)) {
        throw new Error("parameter must be a Number.")
      }
      const len = timestamp.toString().length
      if (len !== 10 && len !== 13) { // 这里必须是 && 并集。
        throw new Error('Number expected to be 10 or 13 at length.')
      }
      const time = Number(timestamp).toString().length === 10 ? timestamp*1000 : timestamp
      
      const padZero = number => number.toString().replace(/^(\d)$/, "0$1") // 补0
      const newDate = new Date(Number(time))
      const year = newDate.getFullYear()
      const month = newDate.getMonth() + 1
      const date = newDate.getDate()
      const hours = newDate.getHours()
      const minutes = newDate.getMinutes()
      
      switch (format) {
        case 'yyyy-MM-dd':
          return `${padZero(year)}-${padZero(month)}-${padZero(date)}`
          break;
        case 'MM-dd':
          return `${padZero(month)}-${padZero(date)}`
          break;
        case 'HH:mm':
          return `${padZero(hours)}:${padZero(minutes)}`
          break
        default:
          return `${padZero(year)}-${padZero(month)}-${padZero(date)} ${padZero(hours)}:${padZero(minutes)}`
      }
    },
    genHeader(h) {
      let timestamp = new Date(this.article.createdAt).toString()
      timestamp = +new Date(timestamp)
      const title = h('h3', {staticClass: 'article-title'}, this.article.title)
      const category = h('a', {staticClass: 'article-category', attrs: {href: '#'}}, [h(VIcon, {props: {icon: 'bookmark'}}), this.article.category.name])
      const time = h('span', {staticClass: 'article-category'}, [h(VIcon, {props: {icon: 'calendar'}}), this.formatDate(timestamp)])
      return h('header', {staticClass: 'article-header'}, [title, h('div',{staticClass: 'article-meta'},[ category, time])])
    },
    genMain(h, content) {
      return h('article', {
        staticClass: 'v-article markdown-body',
        domProps: {
          innerHTML: content
        }
      })
    },
    genBar(h) {
      let likes = 10
      // let 
    },
    genComments(h, comments) {
      const children = comments.map(cm => {
        const replies = cm.replies.map(reply => h(VComment, {props: {side: 'right'}}))
        return h('article', {staticClass: 'article-comments'}, [h(VComment, {props: {reply: true}}), h('div', {staticClass: 'comment-replies'}, replies)])
      })
      const content = h('div', {
        staticClass: 'comment'
      }, [h(VComment)])
      return h('section', {staticClass: 'comment-list'}, children)
    }
  },
  render(h) {
    const cms = this.article.comments
    return h('main', {staticClass: 'article-main'}, [this.genHeader(h), this.genMain(h, this.article.html_string), h(VReaction, {props: {reply: true}, style: {marginTop: '20px'}}), this.genComments(h, cms)])
  }
}