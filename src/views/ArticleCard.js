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
        padding: '0 10px',
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
        padding: '5px 10px',
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
        fontSize: '14px',
        border: '1px solid rgba(0,0,0,.3)'
      }
    }, [title, text, tags])
  }
}