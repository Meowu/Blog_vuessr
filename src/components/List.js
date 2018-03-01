import './list.css'

export default {
  name: 'v-list',
  props: {
    title: [String, Number],
    list: {
      type: Array,
      required: true,
      // validator: val => val.every(v => typeof v === 'object' && v.hasOwnProperty('name') && v.hasOwnProperty('number') && v.hasOwnProperty('id'))
    }
  },
  methods: {
    genTitle(h, text) {
      return h('h3', {
        staticClass: 'list-title'
      }, text)
    },
  },
  render(h) {
    const data = {
      staticClass: 'v-list',
    }
    const list = this.list.map(item => {
      const anchor = h('a', {
        staticClass: 'list-item__name',
        on: {
          click: () => {
            this.$bar.start()
            this.$store.commit('SET_PARAMS', {page: 1, page_size: 15, tag: '', category: item.id})
            this.$store.dispatch('getArticles').then(() => {
              this.$bar.finish()
              this.$router.push(`/articles/categories/${item.name.toLowerCase()}`)
            })
          }
        }
      }, item.name)
      const span = h('span', {
        staticClass: 'list-item_count',
      }, `(${item.counts})`)
      return h('li', {
        staticClass: 'list-item',
      }, [anchor, span])
    })
    const children = [h('ul', data, list)]
    if (this.title + '') {
      children.unshift(this.genTitle(h, this.title))
    }

    return h('div', {staticClass: 'categories-list'},children) 
  }
}