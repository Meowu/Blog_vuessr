import VIcon from './VIcon'
export default {
  name : "social-button",
  functional : true,
  render(h) {
    const style = {
      fontSize: '.5rem',
      color: 'rgba(0,0,0,.65)',
      margin: '0 6px'
    }
    const github = h('a', {
      staticClass: 'icon-github',
      style: style,
      attrs: {
        href: 'https://github.com/meowu',
        target: '_blank'
      }
    }, [
      h(VIcon, {
        'class': {
          'fab fa-github': true
        },
        props: { icon: 'github', fab: true } 
      }),
    ])
    const twitter = h('a', {
      style: style,
      staticClass: 'icon-twitter',
      attrs: {
        href: 'https://twitter.com/luoxiaojie',
        target: '_blank'
      }
    }, [
      h(VIcon, {
        props: { icon: 'twitter', fab: true } 
      }),
    ])
    const codepen = h('a', {
      staticClass: 'icon-pen',
      style: style,
      attrs: {
        href: 'https://codepen.io/vamdoose',
        target: '_blank'
      }
    }, [
      h(VIcon, {
        props: { icon: 'codepen', fab: true } 
      }),
    ])
    return h('div', {
      style: {
        flex: '0 0 30%',
        textAlign: 'right'
      },
      staticClass: 'social-btn'
    }, [twitter, github, codepen])
  }
}