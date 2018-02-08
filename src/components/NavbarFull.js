import Hamburger from './Hamburger'
import VChip from './Chip/VChip'
// import VButton from './VButton'
import VButton from './VButton/index'
import VInput from './VInput'
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
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '960px',
        margin: '0 auto',
        padding: '0 0.333rem',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee'
      }
      return h('header', {
        staticClass: 'v-header',
        style: style
      }, [
        h(Hamburger), navs,
        // h(VButton, {   props: {     type: 'info'   },   on: {     click: () =>
        // console.log('clicked.')   } }, 'primary'), h(VButton, {   props: {     type:
        // 'success'   },   on: {     click: () => console.log('clicked.')   } },
        // 'success'), h(VInput),
        h(VInput, {
          props: {
            label: '邮箱',
            required: true
          },
          domProps: {
            // value: self.value
          },
          on: {
            input(e) {
              // self.value = e.target.value
              // this.$emit('input', e.target.value)
            }
          }
        }),
        h(VInput),
        // h(VButton, {   props: {     disabled: true   },   on: {     click: () =>
        // console.log('clicked.')   } }, '取消'), h(VButton, {   on: {     click: () =>
        // console.log('clicked.')   } }, '确定')
      ])
    },
    genNav(h, items) {
      const children = items.map(item => h('a', {
        staticClass: 'nav-item',
        style: {
          height: '100%',
          padding: '20px 0',
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
          click: () => this
            .$router
            .push(item.path)
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
      style: style
    }, [header])
  }
}
