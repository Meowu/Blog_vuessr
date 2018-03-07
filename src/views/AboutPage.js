export default {
  name: "about-me",
  render(h) {
    return h('div', {
      staticClass: 'about-me',
      style: {
        marginTop: '150px',
        color: '#f2f2f2',
        fontSize: '20px',
      }
    }, 'Pending...')
  }
}