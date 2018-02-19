export default {
  name: 'v-icon',
  functional: true,
  props: {
    icon: {
      type: String,
      default: 'heart',
    },
    fab: {type: Boolean, default: false}
  },
  render(h, {data, props, listeners}) {
    const defaultCls = props.fab ? `fab fa-${props.icon}` : `fa fa-${props.icon}`
    // console.log(data.staticClass);
    // const cls = data.staticClass || defaultCls
    data.staticClass = (`v-icon ${defaultCls}`).trim()

    data.style = data.style || {} // functional 组件更接近底层，这里定义的样式会覆盖 style 中定义的样式
    !data.style.color && (data.style.color = 'steelblue')
    data.on = listeners
    // data.style.margin = '0 6px'
    // return h('i', {
    //   on: listeners
    // }, data)
    return h('i', data)
  }
}