import Hamburger from './Hamburger'
import VChip from './Chip/VChip'
// import VButton from './VButton'
import VButton from './VButton/index'
import VInput from './VInput'
import SocialButton from './SocialBtn'
import SocialBtn from './SocialBtn';
export default {
  name : "v-fullnav",
  // functional: true,
  computed : {
    route() {
      return this.$route.path
    }
  },
  methods : {
    genHeader(h, blocks) {
      const icon = h('a', {
        staticClass: 'v-favicon',
        style: {
          flex: '0 0 22%'
        },
        domProps: {
          innerHTML: '<svg viewBox="-41.666666666666664 0 83.33333333333333 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="jsx-2263963463 artboard-inner" style="width:50px; height: 30px; max-height: 100%;"><g transform="translate(-55 100) scale(1.8518518518518516)" fill="#000"><g id="line1"><path d="M52.200-54.000L43.200-54.000L29.664-30.096L16.200-54.000L7.200-54.000L7.200 0L19.800 0L19.800-22.320L26.640-10.224L32.760-10.224L39.600-22.320L39.600 0L52.200 0ZM26.640-13.896L12.600-38.736L12.600-1.800L9.000-1.800L9.000-52.200L26.640-21.024L44.136-52.200L48.240-52.200ZM28.584-28.224L26.640-24.840L11.160-52.200L15.264-52.200ZM50.400-1.800L46.800-1.800L46.800-38.736L31.824-12.024L27.720-12.024L50.400-52.200ZM14.400-1.800L14.400-31.824L18.000-25.560L18.000-1.800ZM41.400-25.560L45.000-31.824L45.000-1.800L41.400-1.800Z"></path></g></g></svg>'
        }
      })
      const navs = this.genNav(h, [
        {
          name: '首页',
          path: '/'
        }, {
          name: '归档',
          path: '/archives'
        }, {
          name: '关于',
          path: '/about'
        }
      ])
      // const Chip = h(VChip, {}, 'Python')
      const style = {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '960px',
        margin: '0 auto',
        padding: '0 0.333rem',
        justifyContent: 'space-between',
      }
      return h('header', {
        staticClass: 'v-header',
        style: style
      }, [
        navs,
        icon,
        h(SocialButton)
      ])
    },
    genNav(h, items) {
      const children = items.map(item => h('a', {
        staticClass: 'nav-item',
        style: {
          height: '100%',
          // padding: '20px 0',
          lineHeight: '50px',
          width: '1.5rem',
          fontSize: '18px',
          textAlign: 'center',
          cursor: 'pointer',
          // color: 'rgba(0,0,0,.65)'  这里设置 字体会优先级最高，影响全局定义的样式。
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
            this
            .$router
            .push(item.path)
          }
        }
      }, item.name))
      const style = {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        flexFlow: 'row nowrap',
        fontSize: '18px',
        // justifyContent: 'space-between', borderBottom: '1px solid #dcdcdc',
        // padding: '0 16px'
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
      style: style
    }, [header])
  }
}
