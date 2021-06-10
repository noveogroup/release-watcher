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

    <TheUrlAdder class="home__head" @onUrlAdd="setRepo" />

    <TheReposList :repos="repos" @onRemoveRepo="deleteRepo" />

    <TheReposPlaceholder v-if="repos.length === 0" />

    <el-pagination
      class="home__pagination"
      layout="prev, pager, next"
      :total="total"
      :page-size="pagination.perPage"
      :hide-on-single-page="true"
      @current-change="onPageChange"
    />
  </div>
</template>

<script>
import TheUrlAdder from '../components/home/TheUrlAdder'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    TheReposList: () => import('../components/home/TheReposList'),
    TheReposPlaceholder: () => import('../components/home/TheReposPlaceholder'),
    TheUrlAdder
  },

  data: () => ({
    pagination: {
      page: 1,
      perPage: 5
    }
  }),

  computed: {
    ...mapState('currentURL', ['currentURL']),
    ...mapState('repositories', ['repos', 'total'])
  },

  async created () {
    try {
      await this.getRepos(this.pagination)
      await this.getReposTotal()
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    ...mapActions('repositories', [
      'deleteRepo',
      'setRepo',
      'getRepos',
      'getReposTotal'
    ]),

    async onPageChange (page) {
      this.pagination.page = page

      try {
        await this.getRepos(this.pagination)
      } catch (error) {
        console.error(error)
      }
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
