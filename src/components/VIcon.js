export default {
  name: 'v-icon',
  functional: true,
  props: {
    icon: {
      type: String,
      default: 'heart',
    }
  },
  render(h, {data, props, listeners}) {
    data.staticClass = (`v-icon fa fa-${props.icon} ${data.staticClass || ''}`).trim()
    data.style = data.style || {}
    // data.style.margin = '0 6px'
    return h('i', {
      on: listeners
    }, data)
  }
}