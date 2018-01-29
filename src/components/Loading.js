export default {
  name: 'v-laoding',
  functional: true,
  render(h, {data, props, children, listeners}) {
    const text = props.text || '加载更多'
    const style = {
      backgroundColor: 'rgba(0,0,0,.1)',
      margin: '10px auto',
      height: '34px',
      lineHeight: '34px',
      textAlign: 'center',
      letterSpacing: '.1em',
    }
    return h('div', {
      staticClass: 'load-more',
      style: style,
      on: listeners // data.on 的别名
    }, text)
  }
}