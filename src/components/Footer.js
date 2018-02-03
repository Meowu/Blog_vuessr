import './footer.css'
import VIcon from './VIcon';
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
        marginBottom: '10px'
      }
    }, `©Copyright ${year}`)
    const author = h('a', {
      staticClass: 'footer__author',
      attrs: {
        href: href,
      },
      style: {
        margin: '0 10px'
      }
    }, name)
    const title = h('div', {
      staticClass: 'footer_title',
      style: {
        margin: '10px auto'
      }
    }, ['Written with  ', h(VIcon, {style: {margin: '0 8px', color: 'rgb(222, 48, 48)'}}), 'By', author])
    const style = {
      textAlign: position,
      backgroundColor: backgroundColor
    }
    return h('footer', {
      staticClass: 'v-footer',
      style: style,
    }, [title, copy])
  }
}