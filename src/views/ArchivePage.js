export default {
  name: "archive-page",
  render(h) {
    return h('div', {
      staticClass: 'articles-archive',
      style: {
        marginTop: '150px',
        color: '#f2f2f2',
        fontSize: '20px',
      }
    }, 'Pending...')
  }
}