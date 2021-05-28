<template>
  <div v-if="releases">

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
import { mapState } from 'vuex'

import TheRepoToggle from '../components/repo/TheRepoToggle'
import TheReleasesList from '../components/releases/TheReleasesList'

export default {
  name: 'RepoView',
  components: {
    TheRepoToggle,
    TheReleasesList
  },

  data: () => ({
    toggle: false,

    expandedBefore: false
  }),

  computed: {
    ...mapState({
      releases: state => state.releases.releases
    }),

    currentRepoReleases () {
      return this.$store.getters['releases/getCurrentRepoReleases'][this.repoId]
    },

    repoId () {
      return +this.$route.params.id
    }
  },

  async created () {
    await this.$store.dispatch('releases/setReleases', +this.$route.params.id)
  },

  methods: {
    onToggle (val) {
      this.toggle = val
      this.updateAllReleases()
    },

    updateAllReleases () {
      if (this.expandedBefore) { return }
      this.currentRepoReleases.forEach(release => {
        if (release.new === true) {
          const newItem = {
            ...release,
            new: false
          }
          this.$store.dispatch('releases/updateRelease', newItem)
        }
      })
      this.expandedBefore = true
    }
  }
}
</script>

<style lang="scss" scoped>
.RepoView {
  //
}
</style>
