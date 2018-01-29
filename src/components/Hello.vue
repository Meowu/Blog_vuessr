<script>
import VChip from '../components/Chip/VChip'
import VCard from '../views/ArticleCard'
import VHamburger from './Hamburger'
import VFullnav from './NavbarFull.js'
import VNav from './Navbar'
import VLoading from './Loading'
export default {
  name: 'Hello',
  components: {
    VChip,
    VCard,
    VHamburger,
    VNav,
    VLoading,
    VFullnav
  },
  methods: {
    click() {
      console.log('clicked.');
    }
  }
}
</script>

<template>
  <div id='hello'>
    <div class="box">
      <v-nav />
      <v-fullnav />

    </div>
    <v-card />
    <v-card />
    <v-card />
    <v-card />
    <v-loading @click="click" />
  </div>
</template>
<style lang="stylus" scoped>
#hello
  width 100%
  padding .333rem
  margin-top 100px
.nav-toggle
  padding 10px
  position relative
  border  1px solid transparent
  border-radius 4px
  .icon-bar
    display block 
    background-color #000000
    width 20px
    height 2px
    & + .icon-bar 
      margin-top 4px
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

