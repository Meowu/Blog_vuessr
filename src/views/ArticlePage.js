import VComment from '../components/Comment'
import VIcon from '../components/VIcon'
import './article.css'
import './github-markdown.css'
export default {
  name: "v-article-page",
  data() {
    return {
      // comments:
    }
  },
  methods: {
    genHeader(h) {
      const title = h('h3', {staticClass: 'article-title'}, 'Vue 的实现原理和源码分析')
      const category = h('a', {staticClass: 'article-category', attrs: {href: '#'}}, [h(VIcon, {props: {icon: 'bookmark'}}), '技术观察'])
      const time = h('span', {staticClass: 'article-category'}, [h(VIcon, {props: {icon: 'calendar'}}), '2018-02-29'])
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
        return h('article', {staticClass: 'article-comments'}, [h(VComment), h('div', {staticClass: 'comment-replies'}, replies)])
      })
      const content = h('div', {
        staticClass: 'comment'
      }, [h(VComment)])
      return h('section', {staticClass: 'comment-list'}, children)
    }
  },
  render(h) {
    const cms = [{replies: [1, 2, 3]}, {replies: []}]
    return h('main', {staticClass: 'article-main'}, [this.genHeader(h), this.genMain(h, '<em>Strong!Strong!</em>'), this.genComments(h, cms)])
  }
}