import VChip from '../components/Chip/VChip'
export default {
  name: "v-article-card",
  data() {
    return {
      text: 'Listen to your favorite artists and albums whenever and wherever, online and offline.',
      title: "Super Model",
      tags: ['Python', 'Node.js', 'Go', 'Rust']
    }
  },
  methods: {
    genTitle(h, title) {
      const style = {
        fontSize: '30px',
        fontWeight: 400,
        letterSpacing: '-.02em',
        lineHeight: '40px',
        padding: '.4em'
      }
      return h('h3', {
        staticClass: 'card-title',
        style: style
      }, title)
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
    return h('div', {
      staticClass: 'card',
      style: {
        width: '100%',
        backgroundColor: '#FCFBFD',
        borderRadius: '4px',
        fontSize: '14px',
        marginBottom: '12px',
        // border: '1px solid rgba(0,0,0,.3)',
        boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)'
      }
    }, [title, text, tags])
  }
}