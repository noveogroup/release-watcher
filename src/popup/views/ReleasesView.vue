<template>
  <div>

    <el-button
      icon="el-icon-back"
      @click="$router.replace('/')"
    />

    <h1>
      Releases
    </h1>

    <TheRepoToggle
      :value="toggle"
      @onChange="onToggle($event)"
    />

    <TheReleasesList
      v-if="releases"
      :isAllExpanded="toggle"
      :releases="currentRepoReleases"
      :repoId="repoId"
    />
  </div>
</template>

<script>
import TheRepoToggle from '../components/repo/TheRepoToggle'
import TheReleasesList from '../components/releases/TheReleasesList'

import { mapState } from 'vuex'

export default {
  name: 'RepoView',
  components: {
    TheRepoToggle,
    TheReleasesList
  },

  data: () => ({
    toggle: false
  }),

  computed: {
    ...mapState([
      'releases'
    ]),

    currentRepoReleases () {
      return this.$store.getters.getCurrentRepoReleases[this.repoId]
    },

    repoId () {
      return this.$route.params.id.toString()
    }
  },

  async created () {
    await this.$store.dispatch('setReleases', this.$route.params.id.toString())
  },

  methods: {
    onToggle (val) {
      this.toggle = val
    }
  }
}
</script>

<style lang="scss" scoped>
.RepoView {
  //
}
</style>
