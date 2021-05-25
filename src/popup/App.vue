<template>
  <router-view class="router-view"/>
</template>

<script>
import { getUrlFromExt } from '../utils/urlWorkers'

export default {
  name: 'App',

  async created () {
    try {
      await this.$store.dispatch('setCurrentURL', await getUrlFromExt())
      await this.$store.dispatch('setRepos')
      await this.$store.dispatch('setSettings')
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
