import VIcon from './VIcon'
import './reaction.css'
export default {
  name : 'user-reaction',
  functional : true,
  render(h, {data, props}) {
    // functional 组件必须这样获取传进来的样式
    data.style = data.style || {}
    const likes = h('button', {
      staticClass: 'user-likes'
    }, [
      h(VIcon, {
        props: {
          icon: 'thumbs-up'
        }
      }),
      12
    ])
    const replyBtn = h('button', {
      staticClass: 'user-reply',
      on: {
        click: () => {}
      }
    }, '回复')
    const children = [likes]
    props.reply && children.push(replyBtn)
    data.staticClass = 'user-reaction'
    // const h
    return h('div', data, children)
  }
}