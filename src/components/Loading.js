export default {
  name: 'v-loading',
  functional: true,
  render(h, {data, props, children, listeners}) {
    const text = props.text || '加载更多'
    const style = {
      backgroundColor: 'rgba(0,0,0,.1)',
      margin: '20px auto',
      height: '34px',
      lineHeight: '34px',
      textAlign: 'center',
      letterSpacing: '.2em',
      color: 'rgba(35, 36, 31, .8)',
      cursor: 'pointer'
    }
    return h('div', {
      staticClass: 'load-more',
      style: style,
      on: listeners // data.on 的别名
    }, text)
  }
}