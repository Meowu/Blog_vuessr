import Progress from './ProgressBar.vue'
export default {
  install(Vue) {
    const bar = Vue.prototype.$bar = new Vue(Progress).$mount()
    document.body.appendChild(bar.$el)
  }
}