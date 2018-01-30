<script>
import VChip from '../components/Chip/VChip'
import VCard from '../views/ArticleCard'
import VHamburger from './Hamburger'
import VFullnav from './NavbarFull.js'
import VNav from './Navbar'
import VLoading from './Loading'
import VFooter from './Footer'
import VList from './List'
import TagList from './TagList'
export default {
  name: 'Hello',
  components: {
    VChip,
    VCard,
    VHamburger,
    VNav,
    VLoading,
    VFullnav,
    VFooter,
    VList,
    TagList
  },
  data() {
    return {
      show: null,
      category: [
        {name: 'Node.js', number: 14, id: '1'},
        {name: 'Python', number: 6, id: '2'},
        {name: 'Rust', number: 10, id: '3'},
      ]
    }
  },
  mounted() {
    this.show = document.documentElement
  },
  // computed: {
  //   show() {
  //     // width >= 1024 ? 'full' : 'small'
  //     const width = document.documentElement.clientWidth || document.body.clientWidth
  //     return width
  //   }
  // },
  // watch: {
  //   show() {
  //     width >= 1024 ? 'full' : 'small'
  //   }
  // },
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
    <v-list :list="category" title='分类查看' />
    <v-loading @click="click" />
    <tag-list :tags='category'  />
    <!-- <v-footer /> -->
  </div>
</template>
<style lang="stylus" scoped>
#hello
  width 100%
  padding .333rem
  margin-top 110px
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

