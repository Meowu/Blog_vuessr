import VInput from '../VInput'
import VButtton from '../VButton'
import Vue from 'vue'
import Api from '../../api'
import './editor.css'
const editor =  {
  name : 'v-editor',
  props: {
    reply: {
      type: String,
      default: 'article'
    }
  },
  data() {
    return {
      name: '',
      mail: '',
      content: '',
      site: '',
    }
  },
  methods: {
    replyArticle() {

    }
  },
  render(h) {
    const nameField = h(VInput, {
      props: {
        label: '姓名',
        required: true,
        placeholder: '请输入昵称',
        value: name
      },
      on: {
        input: (val) => this.mail = val
      }
    })
    const mailField = h(VInput, {
      props: {
        label: '邮箱',
        required: true,
        placeholder: '请输入邮箱（不公开）',
        value: this.mail
      },
      on: {
        input: (val) => this.mail = val
      }
    })
    const siteField = h(VInput, {
      props: {
        label: '站点',
        placeholder: '请输入站点',
        value: this.site
      },
      on: {
        input: (val) => this.mail = val
      }
    })
    const contentField = h(VInput, {
      props: {
        label: '内容',
        type: 'textarea',
        required: true,
        conotent: this.content
      },
      on: {
        input: (val) => this.mail = val
      }
      // style
    })

    const btnGroup = h('div', {
      staticClass: 'btn-group'
    }, [h(VButtton, '取消'), h(VButtton, '提交')])
    return h('div', {
      staticClass: 'v-editor'
    }, [nameField, mailField, siteField, contentField, btnGroup])
  }
}


let instance

const EditorConstructor = Vue.extend(editor)
const defaults = {
   target: null,
   reply: 'article',
  }

  EditorConstructor.prototype.close = function() {
    if (instance) {
    instance = undefined
  }
  if (this.$el && this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el)
  }
  this.$destroy()
}

EditorConstructor.prototype.open = function () {
  
}

const Editor = (options = {}) => {
  if( Vue.prototype.isServer ) return
  options = Object.assign({}, defaults, options)
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body
  if (instance) {
    console.log('existed.');
    return instance
  }
  const parent = options.target === document.body ? document.body : options.target
  instance = new EditorConstructor({
    el: document.createElement('div'),
    propsData: {
      reply: options.reply
    }
  })
  parent.appendChild(instance.$el)
  console.log('new');
  return instance
}

export default Editor