<template>
  <div class="home">
    <h1>
      Release watcher
    </h1>
    <div class="home__head">
      <WatchItem
        :is-fetching="flags.isFetching"
        @onAddBtnClick="addItem('/vuejs/vue')"
      />
    </div>

    <TheReposList :repos="fetchedRepos"/>
  </div>
</template>

<script>
import WatchItem from '../components/WatchItem'
import TheReposList from '../components/home/TheReposList'

import mock from '../components/home/mock.json'

import { mapState } from 'vuex'

import { fetchRepo } from '../../axios'
import { getUrlFromExt } from '../../utils/urlWorkers'

export default {
  components: {
    WatchItem,
    TheReposList
  },

  data () {
    return {
      fetchedRepos: [],

      currentTabUrl: '',

      flags: {
        isFetching: false
      }
    }
  },

  computed: {
    ...mapState(['currentURL'])
  },

  async mounted () {
    this.fetchedRepos = [...mock]
    this.$store.dispatch('setCurrentURL', await getUrlFromExt())
  },

  methods: {
    async addItem (item) {
      this.flags.isFetching = true

      try {
        this.fetchedRepos.push(await fetchRepo(item))
        this.currentTabUrl = await getUrlFromExt()
      } catch (e) {
        console.log('addItem error', e)
      } finally {
        this.flags.isFetching = false
      }
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
  }
}
</style>
