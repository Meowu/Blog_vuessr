import Hamburger from './Hamburger'
import VChip from './Chip/VChip'
export default {
  name: "v-navbar",
  // functional: true,
  computed: {
    route() {
      return this.$route.path
    }
  },
  methods: {
    genHeader(h, blocks) {
      const Chip = h(VChip, {}, 'Python')
      const style = {
        height: '50px',
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
      }, [h(Hamburger)])
    },
    genNav(h, items) {
      const children = items.map(item => h('a', {
        staticClass: 'nav-item',
        style: {
          height: '45px',
          lineHeight: '45px',
          flex: '1 1 auto',
          fontSize: '15px',
          textAlign: 'center',
        },
        'class': {
          'is-active': this.route === item.path
        },
        on: {
          click: () => this.$router.push(item.path)
        }
      }, item.name))
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
      maxWidth: '960px',
      boxShadow: '0 2px 4px 0 rgba(76,76,75,.1)',
      zIndex: 99,
    }
    const header = this.genHeader(h)
    const navs = this.genNav(h, [{name: '首页', path: '/'}, {name: '归档', path: '/archives'}, {name: '关于', path: '/about'}])
    return h('div', {
      staticClass: 'navbar',
      style: style,
    }, [header, navs])
  }
}