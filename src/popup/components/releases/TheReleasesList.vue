<template>
  <div class="TheReleasesList">
    <el-collapse
      :value="expanded"
      @change="onCollapseChange($event)"
    >
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
      const showedRelease = this.getReleaseById(val[val.length - 1])
      const newItem = {
        ...showedRelease,
        new: false
      }
      this.$store.dispatch('releases/updateRelease', newItem)
    },

    getReleaseById (id) {
      return this.releases.find(release => +release.id === +id)
    }
  }
}
</script>

<style lang="scss" scoped>
.TheReleasesList {
  padding-top: 20px;
}
</style>
