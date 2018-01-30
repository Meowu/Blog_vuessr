import './footer.css'
export  default {
  name: "v-footer",
  functional: true,
  render(h, {data, props, children}) {
    const name = props.name || 'Meowu'
    const href = props.href || 'https://github.com/meowu'
    const position = props.position || 'center'
    const backgroundColor = props.backgroundColor || ''
    const year = new Date().getFullYear()
    const copy = h('span', {
      style: {
        marginRight: '5px'
      }
    }, `© ${year}`)
    const author = h('a', {
      staticClass: 'footer__author',
      attrs: {
        href: href,
      }
    }, name)
    const style = {
      textAlign: position,
      backgroundColor: backgroundColor
    }
    return h('footer', {
      staticClass: 'v-footer',
      style: style,
    }, [copy, author])
  }
}