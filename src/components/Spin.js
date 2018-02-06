import Spinner from './Spinner.vue'
import Vue from 'vue'

const Spin = Vue.extend(Spinner)

const defaults = {
  target: null
}
let instance
// const instance = new ({})
Spin.prototype.close = function () {
  if (instance) {
    instance = undefined
  }
  if (this.$el && this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el)
  }
  this.visible = false
  this.$destroy()
}

const Loading = (options = {}) => {
  if (Vue.prototype.isServer) return
  options = Object.assign({}, defaults, options)
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body
  if (instance) {
    return instance
  }

  let parent = options.target === document.body ? document.body : options.target

  instance = new Spin({
    el: document.createElement('div'),
    data: options
  })
  instance.visible = true
  parent.appendChild(instance.$el)

  return instance
}

export default Loading