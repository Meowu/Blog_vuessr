<script>
import VFullnav from './components/NavbarFull'
import VNav from './components/Navbar'
import VFooter from './components/Footer'
export default {
  components: {
    VFullnav,
    VNav,
    VFooter
  }
}
</script>
<template>
  <div id='app'>
    <v-fullnav />
    <v-nav />
    <router-view></router-view>
    <v-footer />
  </div>
</template>
<style lang="stylus">
  * {
    box-sizing: border-box;
    /* 在X5新内核Blink中，在排版页面的时候，会主动对字体进行放大，会检测页面中的主字体，当某一块字体在我们的判定规则中，认为字号较小，并且是页面中的主要字体，就会采取主动放大的操作。然而这不是我们想要的，可以采取给最大高度解决 */
    // max-height: 100000px;
  }

  *:before, *:after {
      box-sizing: border-box;
    // max-height: 100000px;
  }

  *, *:before, *:after {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  html
    // font-size: $font-size-root
    overflow-x: hidden
    text-rendering: optimizeLegibility
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
  body
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
    background-color lighten(#eceef1, 30%)
    // background-color #fff
    font-size .24rem
    color #34495e
    // overflow-y scroll
    overflow-y auto

  html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th,textarea, td {
    border: 0 none;
    font-size: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  em, strong {
    font-style: normal;
  }

  ul, ol, li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
@media screen and (min-width: 1024px)
  #hello 
    width 960px
    margin 100px auto 0 
  .navbar
    display none 
    visibility hidden
  .full-navbar
    display block
    width 960px
    margin 0 auto
@media screen and (max-width: 768px)
  .full-navbar 
    display none
    visibility hidden
  .navbar 
    display block
</style>