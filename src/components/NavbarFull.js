import Hamburger from './Hamburger'
import VChip from './Chip/VChip'
export default {
  name: "v-fullnav",
  // functional: true,
  methods: {
    genHeader(h, blocks) {
      const navs = this.genNav(h, ['首页', '归档', '关于'])
      const Chip = h(VChip, {}, 'Python')
      const style = {
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '960px',
        margin: '0 auto',
        padding: '0 0.333rem',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
      }
      return h('header', {
        staticClass: 'v-header',
        style: style
      }, [h(Hamburger),navs, Chip])
    },
    genNav(h, items) {
      const children = items.map(item => h('a', {
        style: {
          height: '45px',
          lineHeight: '45px',
          // flex: '1 1 auto',
          marginRight: '40px',
          fontSize: '16px',
          textAlign: 'center',
          color: 'rgba(0,0,0,.65)'
          // color: '#68cdce',
        },
        attrs: {
          href: '#'
        }
      }, item))
      const style = {
        position: 'relative',
        height: '45px',
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        flexFlow: 'row nowrap',
        fontSize: '18px',
        // justifyContent: 'space-between',
        // borderBottom: '1px solid #dcdcdc',
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
      // boxShadow: '0 0 3px 0 rgba(0,0,0,.3)',
      boxShadow: '0 2px 4px 0 rgba(76,76,75,.1)'
    }
    const header = this.genHeader(h)
    return h('div', {
      staticClass: 'full-navbar',
      style: style,
    }, [header])
  }
}
