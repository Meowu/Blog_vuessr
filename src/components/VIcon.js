export default {
  name: 'v-icon',
  functional: true,
  props: {
    icon: {
      type: String,
      default: 'heart',
    }
  },
  render(h, {data, props}) {
    data.staticClass = (`v-icon fa fa-${props.icon} ${data.staticClass || ''}`).trim()
    return h('i', data)
  }
}