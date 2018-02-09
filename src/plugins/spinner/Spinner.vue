<script>
export default {
  name: "Spinner",
  // props: ['target', 'visible'],
  data: () => ({
    visible: false,
    fullscreen: '',
  }),
  methods: {
    // show() {
    //   this.visible = true
    // },
    hide() {
      this.visible = false
    }
  },
  // mounted() {
  //   let parent
  //   if (typeof this.target === 'string' ) {
  //     parent = document.querySelector(this.target)
  //   } else if (this.target instanceof HTMLElement) {
  //     parent = target
  //   } else {
  //     parent = document.body
  //   }
  //   parent.appendChild(this.$el)
  // }
}
</script>
<template>
  <div class="v-spinner-mask" v-show='visible'>
    <div class="spinner"></div>
  </div>
</template>
<style scoped>
.v-spinner-mask {
  position: absolute;
  background-color: rgba(0, 0, 0, .2);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1999;
}
.spinner {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 2px solid transparent;
  border-left-color: rgb(20, 178, 231);
  border-top-color: rgb(20, 178, 231);
  animation: spin 500ms linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>


