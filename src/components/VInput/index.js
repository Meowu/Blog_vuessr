import './input.css'
export default {
  name: 'v-input',
  props: {
    value: [Number, String],
    required: Boolean,
    label: String,
    type: {
    type: String,
    default: 'text'
    }
  },
  methods: {
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
      return h('input', {
        staticClass: 'v-input',
        attrs: Object.assign({}, this.$attrs, {type: this.type})
      })
    }
  },
  render(h) {
    const children = [this.genInput(h)]
    this.label && children.unshift(this.genLabel(h))
    // 如果组件上添加了 'class = "class-name"' , 那么 staticClass 会被其取代
    return h('div', {staticClass: 'el-input__outer'}, children)
  }
}