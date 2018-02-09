<script>
export default {
  name: "ProgressBar",
  data: () => ({
    visible: false,
    percent: 0,
    timeout: 3000,
    // color: 'rgba(71, 167, 223, 0.8)',
  }),
  methods: {
    start() {
      this.show()
      if (this._timer) {
        clearInterval(this._timer)
        this.percent = 0 
      }
      this.increase()
      // this.percent
    },
    increase() {
      let cut = 10000 / Math.floor(this.timeout)
      this._timer = setInterval(() => {
        this.percent += (cut * Math.random())
        this.percent >= 95 && this.finish()
      }, 100)
    },
    finish() {
      this.percent = 100
      this.hide()
    },
    set(num) {
      this.show()
      this.percent = Math.floor(num)
      return this
    },
    get() {
      return Math.floor(this.percent)
    },
    show() {
      this.visible = true
    },
    pause() {
      clearInterval(this._timer)
      return this
    },
    hide() {
      clearInterval(this._timer)
      setTimeout(() => {
        this.visible = false
        this.$nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200);
        })
      }, 500);
    }
  }
}
</script>
<template>
  <div class="progress" v-show="visible" :style="{
    width: percent + '%',
    opacity: visible ? 1 : 0,
  }"></div>
</template>
<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background-color: rgb(29, 158, 233);
  z-index: 999;
  transition: opacity .4s, width .3s;
}
</style>


