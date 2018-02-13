export default {
  name: 'v-chip',
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  methods: {
    getContent(h) {
      // const children = [this.$slots.default]
      const style = {
        height: '28px',
        zIndex: 1,
        fontSize: '14px',
        // verticalAlign: 'middle',
        padding: '0 12px',
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: '28px'
      }
      return h('span', {
        'class': 'chip__content',
        style: style,
      }, this.tag.name)
    },
  },
  render(h) {
    const style = {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#FEFEFE',
      borderRadius: '4px',
      backgroundColor: 'rgba(75,76,71,.3)',
      margin: '4px',
      verticalAlign: 'middle',
      outline: 'none',
      cursor: 'pointer'
    }
    const data = {
      staticClass: 'chip',
      style: style,
      on: Object.assign({}, { 
        mouseenter: e => e.target.style.backgroundColor = 'rgba(75, 76, 71, .6)',
        mouseleave: e => e.target.style.backgroundColor = 'rgba(75,76,71,.3)',
        }, 
      this.$listeners)
    }
    return h('span', data, [this.getContent(h)])
  }
}