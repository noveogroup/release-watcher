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
      v-model="radio1"
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
      v-if="formattedList.length"
      :repos="formattedList"
      @loadMore="loadMore"
      @onRemoveRepo="removeRepo($event)"
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

      currentCount: 10,

      radio1: null,

      flags: {
        isFetching: false
      }
    }
  },

  computed: {
    ...mapState(['currentURL']),

    formattedList () {
      return this.fetchedRepos.slice(0, this.currentCount)
    },

    languagesTopics () {
      return [...new Set(this.fetchedRepos.map(e => e.language))]
    }
  },

  async created () {
    this.fetchedRepos = [...mock]
    this.$store.dispatch('setCurrentURL', await getUrlFromExt())

    const count = 100
    const res = [...this.fetchedRepos]
    const exampleItem = res[res.length - 1]

    for (let i = 0; i < count; i++) {
      res.push({
        ...exampleItem,
        id: exampleItem.id + i + 1
      })
    }

    this.fetchedRepos = res
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

    loadMore () {
      this.currentCount += 10
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
}
</style>
