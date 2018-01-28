<script>
import VChip from '../components/Chip/VChip'
import VCard from '../views/ArticleCard'
export default {
  name: 'Hello',
  components: {
    VChip,
    VCard
  }
}
</script>

<template>
  <div id='hello'>
    This is my first Vue SSR app.
    <v-chip>外卖</v-chip>
    <v-card />
  </div>
</template>
<style lang="stylus" scoped>
#hello
  width 100
  padding .333rem
</style>

