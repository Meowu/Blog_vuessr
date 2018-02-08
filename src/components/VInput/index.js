import './input.css'
export default {
  name : 'v-input',
  props : {
    value: [Number, String],
    required: Boolean,
    label: String,
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data: () => ({
    // value: ''
  }),
  methods : {
    genLabel(h) {
      const name = this.label
      return h('label', {
        staticClass: 'v-input__label',
        'class': {
          'v-input-required__label': this.required
        }
      }, name)
    },
    genInput(h) {
      const self = this
      return h('input', {
        staticClass: 'v-input',
        domProps: {
          value: self.value
        },
        on: {
          input(e) {
            // self.value = e.target.value
            self.$emit('input', e.target.value)
          }
        },
        attrs: {
          value: this.value,
          type: this.type,
          placeholder: this.placeholder
        }
      })
    }
  },
  render(h) {
    const children = [this.genInput(h)]
    this.label && children.unshift(this.genLabel(h))
    // 如果组件上添加了 'class = "class-name"' , 那么 staticClass 会被其取代
    return h('div', {
      staticClass: 'v-input__outer'
    }, children)
  }
}