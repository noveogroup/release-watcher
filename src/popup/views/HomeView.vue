<template>
  <div class="home">

    <h1>
      Release watcher
    </h1>

    <div class="home__head">
      <TheUrlAdder @urlAdded="addUrl($event)"/>

<!--      <TheWatchItem-->
<!--        class="addRepo-btn"-->
<!--        :is-fetching="flags.isFetching"-->
<!--        @onAddBtnClick="addItem('/vuejs/vue')"-->
<!--      />-->
    </div>

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
      v-if="currentPageItems.length"
      :repos="currentPageItems"
      @onRemoveRepo="removeRepo($event)"
    />

    <div>
      {{ repos }}
    </div>

    <el-pagination
      class="home__pagination"
      layout="prev, pager, next"
      :total="fetchedRepos.length"
      :page-size="pagination.pageSize"
      @current-change="onPageChange($event)"
    />

  </div>
</template>

<script>
// import TheWatchItem from '../components/home/TheWatchItem'
import TheReposList from '../components/home/TheReposList'
import TheUrlAdder from '../components/home/TheUrlAdder'

import mock from '../components/home/mock.json'

import { mapState } from 'vuex'

import { fetchRepo } from '../../axios'
import { getUrlFromExt } from '../../utils/urlWorkers'

export default {
  components: {
    // TheWatchItem,
    TheReposList,
    TheUrlAdder
  },

  data () {
    return {
      fetchedRepos: [],

      sortBy: null,

      pagination: {
        page: 0,
        pageSize: 5
      },

      flags: {
        isFetching: false
      }
    }
  },

  computed: {
    ...mapState([
      'currentURL',
      'repos'
    ]),

    currentPageItems () {
      const startIdx = this.pagination.page * this.pagination.pageSize
      const endIdx = startIdx + this.pagination.pageSize

      return this.sortedRepos.slice(startIdx, endIdx)
    },

    sortedRepos () {
      if (!this.sortBy) return this.fetchedRepos

      const newArr = [...this.fetchedRepos]

      return newArr.sort((a, b) => {
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
      return [...new Set(this.fetchedRepos.map(e => e.language))]
    }
  },

  async created () {
    this.fetchedRepos = [...mock]
    this.$store.dispatch('setRepos', mock)
    this.$store.dispatch('setCurrentURL', await getUrlFromExt())
  },

  methods: {
    async addItem (item) {
      this.flags.isFetching = true

      try {
        this.fetchedRepos.push(await fetchRepo(item))
      } catch (e) {
        console.log('addItem error', e)
      } finally {
        this.flags.isFetching = false
      }
    },

    removeRepo (id) {
      const idx = this.fetchedRepos.indexOf(this.fetchedRepos.find(e => e.id === id))
      this.fetchedRepos.splice(idx, 1)
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
