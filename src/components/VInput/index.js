import './input.css'
export default {
  name : 'v-input',
  props : {
    value: [Number, String],
    required: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    autoComplete: {
      type: Boolean,
      default: 'off',
    },
    autofocus: Boolean,
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
    currentValue: ''
  }),
  watch: {
    'value'(val, old) {
      console.log(this.currentValue);
      console.log(val);
      console.log(old);
    }
  },
  methods : {
    setValue(val) {
      this.currentValue = val
    },
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
      const tag = this.type === 'text' ? 'input' : 'textarea'

      const data = {
        staticClass: 'v-input',
        domProps: {
          value: this.currentValue,
          autofocus: this.autofocus,
          required: this.required,
          disabled: this.disabled,
        },
        on: {
          input(e) {
            const value = e.target.value
            self.setValue(value)
            self.$emit('input', value)
          }
        },
        attrs: {
          autocomplete: this.autoComplete,
          type: this.type,
          placeholder: this.placeholder
        }
      }
      return h(tag, data)
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