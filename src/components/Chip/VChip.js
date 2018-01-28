export default {
  name: 'v-chip',
  methods: {
    getContent(h) {
      const children = [this.$slots.default]
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
      }, children)
    }
  },
  render(h) {
    const style = {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'rgba(0, 0, 0, .8)',
      borderRadius: '4px',
      backgroundColor: 'rgba(0, 0, 0, .12)',
      margin: '4px',
      verticalAlign: 'middle',
      outline: 'none'
    }
    const data = {
      staticClass: 'chip',
      style: style,
      on: this.$listeners
    }
    return h('span', data, [this.getContent(h)])
  }
}