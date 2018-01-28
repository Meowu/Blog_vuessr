<script>
import VChip from '../components/Chip/VChip'
export default {
  name: 'Hello',
  components: {
    VChip
  }
}
</script>

<template>
  <div id='hello'>
    This is my first Vue SSR app.
    <v-chip>外卖</v-chip>
  </div>
</template>
<style lang="stylus" scoped>
#hello
  font-size .2rem
  padding 0 1rem
</style>
