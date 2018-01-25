<script>
  export default {
    components: {
    }
  }
</script>
<template>
  <div id='app'>
    <p>Welcome to Vue SSR.</p>
    <router-view></router-view>
  </div>
</template>
<style lang="stylus">
  * 
    margin 0
  body
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
    background-color lighten(#eceef1, 30%)
    margin 0
    color #34495e
    overflow-y scroll
  #app 
    font-size 14px
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    word-break break-all
  /*word-wrap: break-word;*/
</style>