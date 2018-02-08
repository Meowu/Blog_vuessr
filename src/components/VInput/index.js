import './input.css'
export default {
  name: 'v-input',
  props: {
    value: [Number, String],
    required: Boolean,
    label: String,
  },
}