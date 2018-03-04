import Hamburger from './Hamburger'
import VChip from './Chip/VChip'
import SocialButton from './SocialBtn'
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
      const style = {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        // padding: '',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        padding: '0 16px'
      }
      const icon = h('a', {
        staticClass: 'v-favicon',
        domProps: {
          innerHTML: '<svg viewBox="-41.666666666666664 0 83.33333333333333 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="jsx-2263963463 artboard-inner" style="width:40px; height: 30px; max-height: 100%;"><g transform="translate(-55 100) scale(1.8518518518518516)" fill="#000"><g id="line1"><path d="M52.200-54.000L43.200-54.000L29.664-30.096L16.200-54.000L7.200-54.000L7.200 0L19.800 0L19.800-22.320L26.640-10.224L32.760-10.224L39.600-22.320L39.600 0L52.200 0ZM26.640-13.896L12.600-38.736L12.600-1.800L9.000-1.800L9.000-52.200L26.640-21.024L44.136-52.200L48.240-52.200ZM28.584-28.224L26.640-24.840L11.160-52.200L15.264-52.200ZM50.400-1.800L46.800-1.800L46.800-38.736L31.824-12.024L27.720-12.024L50.400-52.200ZM14.400-1.800L14.400-31.824L18.000-25.560L18.000-1.800ZM41.400-25.560L45.000-31.824L45.000-1.800L41.400-1.800Z"></path></g></g></svg>'
        }
      })
      return h('header', {
        staticClass: 'v-header',
        style: style
      }, [icon, h(SocialButton)])
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
          cursor: 'pointer'
        },
        'class': {
          'is-active': this.route === item.path
        },
        on: {
          click: () => {
            if (Object.is(item.path, '/')){
              this.$store.commit('SET_PARAMS', {
                  page: 1,
                  page_size: 15,
                  tag: '',
                  category: ''
                })
              }
            this.$router.push(item.path)
          }
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