export default {
  name: 'v-comment',
  props: {
    tile: Boolean,
    size: {
      type: [String, Number],
      default: 48,
      validator: v => !!Number(v)
    }
  },
  render(h) {

  }
}