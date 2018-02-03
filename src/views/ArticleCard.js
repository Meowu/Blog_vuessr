import VChip from '../components/Chip/VChip'
export default {
  name: "v-article-card",
  data() {
    return {
      text: 'include 和 exclude 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示。',
      title: "Vue 的实现原理和源码分析",
      tags: ['Python', 'Node.js', 'Go', 'Rust']
    }
  },
  methods: {
    genTitle(h, title) {
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
          click: () => this.$router.push(`/articles/233`)
        }
      }, [h('span', title), h('span',{style:{fontSize: '12px', fontWeight: '200', color: 'rgba(0,0,0,.5)', marginRight: '10px'}}, '2018-02-30')])
    },
    genText(h, text) {
      const style = {
        fontSzie: '14px',
        padding: '0 12px',
        width: '100%',
        marginBottom: '10px'
      }
      return h('p', {
        staticClass: 'card-text',
        style: style,
      }, text)
    },
    genTags(h, tags) {
      const style = {
        padding: '5px 12px',
        marginBottom: '10px'
      }
      const children = tags.map(tag => h(VChip, null, tag))
      return h('div', {
        style: style,
        staticClass: 'card-tags'
      }, children)
    }
  },
  render(h) {
    const tags = this.genTags(h, this.tags)
    const text = this.genText(h, this.text)
    const title = this.genTitle(h, this.title)
    // const meta = h('')
    return h('div', {
      staticClass: 'card',
      style: {
        width: '100%',
        backgroundColor: '#FCFBFD',
        borderRadius: '4px',
        fontSize: '14px',
        marginBottom: '16px',
        // border: '1px solid rgba(0,0,0,.3)',
        boxShadow: '0 1px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12)'
      },
      on: {
        click: () => {
          console.log('click card.');
        }
      }
    }, [title, text, tags])
  }
}