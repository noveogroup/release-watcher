<template>
  <router-view class="router-view"/>
</template>

<script>
import mock from './components/home/mock.json'
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState([
      'currentURL',
      'repos'
    ])
  },

  async created () {
    try {
      await this.$store.dispatch('setRepos', mock)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style lang="scss">
html {
  width: 400px;
  height: 560px;

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 14px 10px;
    height: 100%;
  }

  .router-view {
    height: 100%;
  }
}
</style>
