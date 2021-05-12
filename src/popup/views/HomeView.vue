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
      currentTabUrl: {{ currentTabUrl }}
    </div>
  </div>
</template>

<script>
import WatchItem from '../components/WatchItem'

import { fetchRepo } from '../../axios'

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

  methods: {
    async getCurrentTabUrl () {
      const res = await browser.tabs.query({
        active: true,
        currentWindow: true
      })
      this.currentTabUrl = res[0].url
    },

    async addItem (item) {
      this.flags.isFetching = true

      try {
        this.fetchedRepos.push(await fetchRepo(item))
        await this.getCurrentTabUrl()
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
