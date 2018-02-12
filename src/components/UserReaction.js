import VIcon from './VIcon'
import './reaction.css'
export default {
  name : 'user-reaction',
  functional : true,
  render(h, {data, props}) {
    // functional 组件必须这样获取传进来的样式
    data.style = data.style || {}
    const children = []
    if (props.likes) {
      const likes = h('button', {
        staticClass: 'user-likes'
      }, [
        h(VIcon, {
          props: {
            icon: 'thumbs-up'
          }
        }),
        props.likes
      ])
      children.push(likes)
    }
    if (props.reply) {
      const replyBtn = h('button', {
        staticClass: 'user-reply',
      }, '回复')
      children.push(replyBtn)
    }
    data.staticClass = 'user-reaction'
    return h('div', data, children)
  }
}