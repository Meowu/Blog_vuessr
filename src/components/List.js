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
    genIcon(h, text) {

    }
  },
  render(h) {
    const data = {
      staticClass: 'v-list',
    }
    const children = this.list.map(item => {
      const anchor = h('a', {
        staticClass: 'list-item__name'
      }, item.name)
      const span = h('span', {
        staticClass: 'list-item_count'
      }, `(${item.counts})`)
      return h('li', {
        staticClass: 'list-item',
      }, [anchor, span])
    })
    if (this.title + '') {
      children.unshift(this.genTitle(h, this.title))
    }

    return h('ul', data, children)
  }
}