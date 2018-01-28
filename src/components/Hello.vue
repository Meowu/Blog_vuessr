<script>
import VChip from '../components/Chip/VChip'
import VCard from '../views/ArticleCard'
import VHamburger from './Hamburger'
import VNav from './Navbar'
export default {
  name: 'Hello',
  components: {
    VChip,
    VCard,
    VHamburger,
    VNav
  }
}
</script>

<template>
  <div id='hello'>
    <v-card />
    <v-card />
    <v-card />
    <v-card />
    <v-nav />
  </div>
</template>
<style lang="stylus" scoped>
#hello
  width 100
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
  
</style>

