import './button.css'
export default {
  name: 'v-button',
  // functional: true,
  props: {
    disabled: Boolean,
    flat: Boolean,
    type: {
      type: String,
      default: 'plain'
    }
  },
  computed: {
    classes: {
      'v-btn__plain': this.type === 'plain',
      'v-btn__danger': this.type === 'danger',
      'v-btn__primary': this.type === 'primary',
      'v-btn__info': this.type === 'info',
      'v-btn__flat': this.flat,
      'v-btn__round': this.round,
    }
  },
  render(h) {
    return h('button', {
      staticClass: 'v-btn',
      'class': this.classes
    }, [this.$slots.default])
  }
}