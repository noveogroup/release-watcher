<template>
  <div class="releases">
    <div>
      <el-button
        icon="el-icon-back"
        @click="$router.replace('/')"
      />
    </div>

    <div class="releases__title">
      <h1 class="releases__heading">{{ $route.query.name }}</h1>
      <el-tag size="mini">latest releases</el-tag>
    </div>

    <TheRepoToggle
      :value="toggle"
      @onChange="onToggle($event)"
      v-if="releases.length > 0"
    />

    <TheReleasesPlaceholder v-if="releases.length === 0" />

    <TheReleasesList
      :isAllExpanded="toggle"
      :releases="releases"
      :repoId="repoId"
    />

    <el-pagination
      class="releases__pagination"
      layout="prev, pager, next"
      :total="total"
      :page-size="pagination.perPage"
      :hide-on-single-page="true"
      @current-change="onPageChange"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import TheRepoToggle from '../components/repo/TheRepoToggle'
import TheReleasesList from '../components/releases/TheReleasesList'
import TheReleasesPlaceholder from '../components/releases/TheReleasesPlaceholder'

export default {
  name: 'RepoView',
  components: {
    TheRepoToggle,
    TheReleasesList,
    TheReleasesPlaceholder
  },

  data: () => ({
    toggle: false,
    expandedBefore: false,
    pagination: {
      page: 1,
      perPage: 7
    }
  }),

  computed: {
    ...mapState('releases', ['releases', 'total']),

    repoId () {
      return Number(this.$route.params.id)
    }
  },

  async created () {
    try {
      const { repoId, pagination } = this

      await this.getReleases({ ...pagination, filters: { repoId } })
      await this.getReleasesTotal({ repoId })
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    ...mapActions('releases', [
      'getReleases',
      'getReleasesTotal',
      'updateRelease'
    ]),
    onToggle (val) {
      this.toggle = val
      this.updateAllReleases()
    },

    updateAllReleases () {
      if (this.expandedBefore) { return }
      this.releases.forEach(release => {
        if (release.new === true) {
          const newItem = {
            ...release,
            new: false
          }
          this.updateRelease(newItem)
        }
      })
      this.expandedBefore = true
    },

    async onPageChange (page) {
      this.pagination.page = page

      try {
        const { repoId, pagination } = this
        await this.getReleases({ ...pagination, filters: { repoId } })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.releases {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__title {
    display: flex;
    align-items: baseline;
  }
  &__heading {
    margin: 8px 8px 8px 0;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  &__pagination {
    margin-top: auto;
    padding: 10px 0;
    text-align: center;
  }
}
</style>
