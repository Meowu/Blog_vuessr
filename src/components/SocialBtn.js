import VIcon from './VIcon'
export default {
  name : "social-button",
  functional : true,
  render(h) {
    const github = h('a', {
      staticClass: 'icon-github',
      attrs: {
        href: 'https://github.com/meowu',
        target: '_blank'
      }
    }, [
      h(VIcon, {
        'class': {
          'fab fa-github': true
        },
        props: { icon: 'github' } 
      }),
    ])
    const twitter = h('a', {
      staticClass: 'icon-twitter',
      attrs: {
        href: 'https://twitter.com/luoxiaojie',
        target: '_blank'
      }
    }, [
      h(VIcon, {
        'class': {
          'fab fa-twitter': true
        },
        props: { icon: 'twitter' } 
      }),
    ])
    const codepen = h('a', {
      staticClass: 'icon-pen',
      attrs: {
        href: 'https://codepen.io/vamdoose',
        target: '_blank'
      }
    }, [
      h(VIcon, {
        'class': {
          'fab fa-codepen': true
        },
        props: { icon: 'codepen' } 
      }),
    ])
    return h('div', {
      staticClass: 'social-btn'
    }, [twitter, github, codepen])
  }
}