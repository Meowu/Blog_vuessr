import VComment from '../components/Comment'
import VIcon from '../components/VIcon'
import VReaction from '../components/UserReaction'
import VChip from '../components/Chip/VChip'
import VEditor from '../components/VEditor'
import './article.css'
import './github-markdown.css'
import './hljs.css'
export default {
  name: "v-article-page",
  asyncData({store, route: {params: {id}}}) {
    console.log(id);
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
      comments = comments || []
      const children = comments.map(cm => {
        let replies
        if (cm.replies.length) {
          replies = cm.replies.map(reply => h(VComment, {props: {side: 'right', content: reply}}))
        }
        return h('article', {staticClass: 'article-comments'}, [h(VComment, {props: {reply: true, content: cm}}), h('div', {staticClass: 'comment-replies'}, replies)])
      })
      const content = h('div', {
        staticClass: 'comment'
      }, [h(VComment)])
      return h('section', {staticClass: 'comment-list'}, children)
    },
    genTags(h) {
      const style = {
        padding: '15px 0'
        // marginBottom: '10px'
      }
      const children = this.article.tags.map(tag => h(VChip, {props: {tag: tag}}))
      return h('div', {
        style: style,
        staticClass: 'card-tags'
      }, children)
    },
    genReaction(h) {
      let children = []
      const likes = h('button', {
        staticClass: 'user-likes'
      }, [
        h(VIcon, {
          on: {
            click: () => {
              this.$bar.start()
              this.$store.dispatch('upArticle', this.article._id).then(() => { 
                this.$bar.finish()
                this.$refs.heart.style.color = 'rgb(222, 48, 48)'
              }).catch(e => {})
            }
          },
          ref: 'heart',
        }),
        this.article.likes
      ])
      children.push(likes)
      const replyBtn = h('button', {
        staticClass: 'user-reply',
        on: {
          click: () => {
            console.log('clicked');
            const editor = new VEditor({target: '.article-main .user-reaction'})
          }
        }
      }, '回复')
      children.push(replyBtn)
      return h('div', {
        staticClass: 'user-reaction',
  }, children)
    }
  },
  render(h) {
    const cms = this.article.comments
    return h('main', {staticClass: 'article-main'}, [this.genHeader(h), this.genMain(h, this.article.html_string), this.genTags(h), this.genReaction(h), this.genComments(h, cms)])
  }
}