<template>
  <div class="home-view">
    home view
    <WatchItem v-model="watchItemModel" />
    watchItemModel: {{watchItemModel}}
  </div>
</template>

<script>
import WatchItem from '../components/WatchItem'

export default {
  components: {
    WatchItem
  },
  data () {
    return {
      watchItemModel: '',
      test: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.home-view {
}
</style>
