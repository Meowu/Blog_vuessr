import './button.css'
export default {
  name : 'v-button',
  // functional: true,
  props : {
    disabled: Boolean,
    flat: Boolean,
    type: {
      type: String,
      default: 'button'
    }
  },
  computed : {
    classes() {
      return {
        'v-btn--plain': this.type === 'plain',
        'v-btn--danger': this.type === 'danger',
        'v-btn--primary': this.type === 'primary',
        'v-btn--error': this.type === 'error',
        'v-btn--info': this.type === 'info',
        'v-btn--flat': this.flat,
        'v-btn--round': this.round,
        'v-btn--disabled': this.disabled
      }
    }
  },
  render(h) {
    return h('button', {
      staticClass: 'v-btn',
      'class': this.classes,
      on: this.$listeners
    }, [this.$slots.default])
  }
}