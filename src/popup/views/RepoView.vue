<template>
  <div>
    <el-button
      icon="el-icon-back"
      @click="$router.replace('/')"
    />
    <TheRepoToggle />
    repo id: {{ $route.params.id }}
    {{ releases }}
  </div>
</template>

<script>
import TheRepoToggle from '../components/repo/TheRepoToggle'
import { mapState } from 'vuex'

export default {
  name: 'RepoView',
  components: {
    TheRepoToggle
  },

  computed: {
    ...mapState([
      'releases'
    ])
  },

  async created () {
    this.$store.dispatch('setReleases', this.$route.params.id.toString())
  }
}
</script>

<style lang="scss" scoped>
.RepoView {
  //
}
</style>
