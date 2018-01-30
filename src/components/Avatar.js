import './avatar.css'
export default {
  name: 'v-avatar',
  functional: true,
  props: {
    tile: Boolean,
    size: {
      type: [Number, String],
      default: 48,
      validator: v => !!Number(v)
    },
    round: {
      type: String,
      validator: v => /^\d+px$/.test(v) || /^\d+%$/.test(v),  // 只有通过了验证才会生效。
      default: '50%'
    },
    url: String,  // props 是可选的，所有属性都会被解析为 props 属性。但是如果声明了一部分属性，不声明的都会被解析为为 data.attrs 。
  },
  render(h, {data, props}) {
    data.staticClass = (`v-avatar ${data.staticClass || ''}`).trim()

    const url = props.url || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    data.style = data.style || {}
    data.style.height = parseInt(props.size) + 'px'
    data.style.width = parseInt(props.size) + 'px'
    data.style.borderRadius = props.round
    if (props.tile) {
      data.staticClass += ` avatar-tile`
    }
    return h('div', data, [h('img', {
      attrs: {src: url},
      style: {borderRadius: props.round}
    }, [])])
  }
}