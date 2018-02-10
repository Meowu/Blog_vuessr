import VChip from '../components/Chip/VChip'
import VIcon from '../components/VIcon'
import './card.css'
export default {
  name: "v-article-card",
  props: {
    meta: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      text: 'include 和 exclude 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示。',
      title: "Vue 的实现原理和源码分析",
      tags: ['Python', 'Node.js', 'Go', 'Rust']
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
    genTitle(h, title) {
      let time = new Date(this.meta.post_date).toString()
      time = +new Date(time)
      const style = {
        fontSize: '15px',
        fontWeight: 600,
        letterSpacing: '-.02em',
        lineHeight: '40px',
        padding: '.2em .8em',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'space-between',
      }
      return h('h3', {
        staticClass: 'card-title',
        style: style,
        on: { 
          click: () => this.$router.push(`/articles/${this.meta.id}`)
        }
      }, [h('span', this.meta.title), h('span',{style:{fontSize: '13px', fontWeight: '400', color: 'rgba(0,0,0,.65)', marginRight: '10px'}}, `${this.formatDate(time, 'yyyy-MM-dd')}`)])
    },
    genText(h) {
      return h('p', {
        staticClass: 'card-text',
      }, this.meta.summary)
    },
    genTags(h) {
      const style = {
        padding: '5px 12px',
        marginBottom: '10px'
      }
      const children = this.meta.tags.map(tag => h(VChip, {props: {tag: tag}}))
      return h('div', {
        style: style,
        staticClass: 'card-tags'
      }, children)
    },
    genMeta(h) {
      const likes = h('button', {
        staticClass: 'user-likes'
      }, [
        h(VIcon, {
          props: {
            icon: 'heart'
          }
        }),
        this.meta.likes
      ])
      const views = h('button', {
        staticClass: 'user-views'
      }, [
        h(VIcon, {
          props: {
            icon: 'eye'
          }
        }),
        this.meta.page_views
      ])
      const comments = h('button', {
        staticClass: 'user-comments'
      }, [
        h(VIcon, {
          props: {
            icon: 'comments'
          }
        }),
        this.meta.comments_count
      ])
      return h('div', {staticClass: 'card-meta'}, [views, likes, comments])
    }
  },
  render(h) {
    const meta = this.genMeta(h)
    const text = this.genText(h)
    const title = this.genTitle(h)
    // const meta = h('')
    return h('div', {
      staticClass: 'article-card',
      on: {
        click: () => {
          console.log('click card.');
        }
      }
    }, [title, text, meta])
  }
}