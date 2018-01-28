export default {
  name: "v-hamburger",
  functional: true,
  render(h) {
    // const 
    const bars = Array.from(Array(3), _ => h('span', {
      staticClass: 'icon-bar',
      style: {
        display: 'block', 
        backgroundColor: '#000000',
        marginTop: '4px',
        width: '20px',
        height: '2px',
      }
    }))
    return h('button', {
      staticClass: 'nav-toggle',
      style: {
        padding: '6px 10px 10px',
        position: 'relative',
        border:  '1px solid transparent',
        borderRadius: '4px'
      }
    }, bars)
  }
}