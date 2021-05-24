<template>
  <div class="TheReleasesList">
    <el-collapse :value="expanded">
      <TheReleasesRow
        v-for="release in releases"
        :key="release.id"
        :release="release"
      />
    </el-collapse>
  </div>
</template>

<script>

export default {
  name: 'TheReleasesList',
  components: {
    TheReleasesRow: () => import('./TheReleasesRow')
  },

  props: {
    isAllExpanded: {
      type: Boolean,
      default: true
    },
    repoId: {
      type: String,
      default: ''
    },
    releases: {
      type: Array,
      default: () => ([])
    }
  },

  data: () => ({
    expandedReleases: []
  }),

  computed: {
    allReleasesIds () {
      return this.releases.map(release => release.id)
    },

    expanded () {
      return this.isAllExpanded ? this.allReleasesIds : this.expandedReleases
    }
  }
}
</script>

<style lang="scss" scoped>
.TheReleasesList {
  padding-top: 20px;
}
</style>
