<template>
  <div class="TheReleasesList">
    <el-collapse
      :value="expanded"
      @change="onCollapseChange($event)"
      v-for="release in releases"
      :key="release.id"
    >
      <TheReleasesRow :release="release" />
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
      type: Number,
      require: true
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
  },

  methods: {
    onCollapseChange (val) {
      if (!val.length) { return }
      const showedRelease = this.releases.find(release => release.id === val[0])
      const newItem = {
        ...showedRelease,
        new: 0
      }
      if (Boolean(showedRelease.new) === true) {
        this.$store.dispatch('releases/updateRelease', newItem)
        this.$store.dispatch('repositories/decrementNewReleasesCount', newItem.repoId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.TheReleasesList {
  padding-top: 20px;
}
</style>
