<template>
  <div class="home">

    <h1>
      Release watcher
      <el-button
        size="small"
        icon="el-icon-s-tools"
        @click="$router.push('/settings')"
      />
    </h1>

    <TheUrlAdder
      class="home__head"
      @onUrlAdd="onUrlAdded($event)"
    />

    <el-radio-group
      class="home__tags"
      v-model="sortBy"
      size="mini"
    >
      <el-radio-button
        v-for="language in languagesTopics"
        :key="language"
        :label="language"
      >
        {{ language }}
      </el-radio-button>
    </el-radio-group>

    <TheReposList
      v-if="repos"
      :repos="currentPageItems"
      @onRemoveRepo="onRemoveRepo($event)"
    />

    <el-pagination
      v-if="repos"
      class="home__pagination"
      layout="prev, pager, next"
      :total="repos.length"
      :page-size="pagination.pageSize"
      :hide-on-single-page='true'
      @current-change="onPageChange($event)"
    />

  </div>
</template>

<script>
import TheUrlAdder from '../components/home/TheUrlAdder'

import { mapState } from 'vuex'

export default {
  components: {
    TheReposList: () => import('../components/home/TheReposList'),
    TheUrlAdder
  },

  data () {
    return {
      sortBy: null,

      pagination: {
        page: 0,
        pageSize: 5
      }
    }
  },

  computed: {
    ...mapState({
      currentURL: state => state.currentURL.currentURL,
      repos: state => state.repositories.repos
    }),

    currentPageItems () {
      const startIdx = this.pagination.page * this.pagination.pageSize
      const endIdx = startIdx + this.pagination.pageSize

      return this.sortedRepos?.slice(startIdx, endIdx)
    },

    sortedRepos () {
      if (!this.sortBy) return this.repos

      return [...this.repos].sort((a, b) => {
        const langA = a.language.toLowerCase()
        const langB = b.language.toLowerCase()
        const sortByTLC = this.sortBy.toLowerCase()

        if (langA === sortByTLC && langB !== sortByTLC) {
          return -1
        }

        if (langA !== sortByTLC && langB === sortByTLC) {
          return 1
        }

        return 0
      })
    },

    languagesTopics () {
      return [...new Set(this.repos?.map(e => e.language))]
    }
  },

  methods: {

    async onRemoveRepo (id) {
      await this.$store.dispatch('repositories/deleteRepo', id)
    },

    async onUrlAdded (id) {
      await this.$store.dispatch('repositories/setRepo', id)
    },

    onPageChange (event) {
      this.pagination.page = event - 1
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;

  & > h1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__tags {
    margin-bottom: 12px;
  }

  &__pagination {
    margin-top: auto;
    padding: 10px 0;
    text-align: center;
  }
}
</style>
