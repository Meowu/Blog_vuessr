export default {
  name: 'v-image',
  props: {
    height: {
      type: [Number, String],
      default: '100%',
      validator: v => /^\d+px$/.test(v) || /^\d+%$/.test(v) || /^\d+$/.test(v)
    },
    width: {
      type: [Number, String],
      default: '100%',
      validator: v => /^\d+px$/.test(v) || /^\d+%$/.test(v) || /^\d+$/.test(v)
    },
    url: String,
    title: String
  },
  computed:　{
    styles() {
      return {
        // width: '100%',
        margin: '10px',
      }
    }
  },
  methods: {
    genTitle(h, text) {
      const style = {
        width: '100%',
        padding: '8px 0',
        // height: '60px',
        fontSize: '20px',
        fontWeight: '400',
        // lineHeight: '60px'
      }
      return h('h2', {
        staticClass: 'image__title',
        style: style
      }, text)
    },
    genImage(h, url, alt) {
      const style = {
        width: '120px',
        height: '120px',
        // lineHeight: '',
      }
      return h('img', {
        attrs: {
          src: url,
          alt: alt || 'v-image'
        },
        // directives: [{
        //   name: 'hover'
        // }],
        style: style
      },[])
    }
  },
  render(h) {
    const url = this.url || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' // 1 x 1 透明 gif，避免图片没有地址显示一坨东西。
    const child = [this.genImage(h, url)]
    if (this.title) {
      child.push(this.genTitle(h, this.title))
    }
    const style = {
      border: '1px solid transparent'
    }
    if (/^\d+$/.test(this.height) && /^\d+$/.test(this.width)) {
      style.width = this.width + 'px',
      style.height = this.height + 'px'
    } else if (/^\d+%$/.test(this.height) && /^\d+%$/.test(this.width)) {
      style.height = this.height
      style.width= this.width
    }
    return h('div', {
      staticClass: 'v-image',
      style: style
    }, child)
  }
}