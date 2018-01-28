import Hamburger from './Hamburger'
import VChip from './Chip/VChip'
export default {
  name: "v-navbar",
  // functional: true,
  methods: {
    genHeader(h, blocks) {
      // const children = blocks.map(block => h('div', null, [h(block)]))
      const Chip = h(VChip, {}, 'Python')
      const style = {
        height: '55px',
        display: 'flex',
        alignItems: 'center',
        // padding: '',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        padding: '0 16px'
      }
      return h('header', {
        staticClass: 'v-header',
        style: style
      }, [h(Hamburger), Chip])
    },
    genNav(h, items) {
      const children = items.map(item => h('a', {
        style: {
          height: '45px',
          lineHeight: '45px',
          flex: '1 1 auto',
          fontSize: '15px',
          textAlign: 'center',
          color: 'rgba(0,0,0,.65)'
        },
        attrs: {
          href: '#'
        }
      }, item))
      const style = {
        position: 'relative',
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        borderBottom: '1px solid #dcdcdc',
        padding: '0 16px'
      }
      return h('nav', {
        staticClass: 'v-navbar',
        style: style
      }, children)
    }
  },
  render(h) {
    const style = {
      position: 'fixed',
      backgroundColor: '#fefefe',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 99,
    }
    const header = this.genHeader(h)
    const navs = this.genNav(h, ['首页', '归档', '关于'])
    return h('div', {
      staticClass: 'navbar',
      style: style,
    }, [header, navs])
  }
}