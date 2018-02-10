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
    data.staticClass = (`v-icon fab fa fa-${props.icon} ${data.staticClass || ''}`).trim()

    data.style = data.style || {}
    data.on = listeners
    // data.style.margin = '0 6px'
    // return h('i', {
    //   on: listeners
    // }, data)
    return h('i', data)
  }
}