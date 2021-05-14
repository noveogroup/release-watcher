<template>
  <div class="home-view">
    <WatchItem
      :is-fetching="flags.isFetching"
      @onAddBtnClick="addItem($event)"
    />
    <template>
      {{ fetchedRepos }}
    </template>
    <div>
      currentURL: {{ currentURL }}
    </div>
  </div>
</template>

<script>
import WatchItem from '../components/WatchItem'
import { mapState } from 'vuex'

import { fetchRepo } from '../../axios'
import { getUrlFromExt } from '../../utils/urlWorkers'

export default {
  components: {
    WatchItem
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
.home-view {
}
</style>
