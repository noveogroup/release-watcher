<template>
  <router-view class="router-view"/>
</template>

<script>
import { getUrlFromExt } from '../utils/urlWorkers'

import store from '@/store'
import { repositories } from '@/store/modules/repositories/repositories.js'
import { currentURL } from '@/store/modules/currentURL/currentURL.js'
import { releases } from '@/store/modules/releases/releases.js'

const modules = {
  repositories,
  currentURL,
  releases
}

Object.keys(modules).forEach(moduleName => {
  if (!store.state[moduleName]) {
    store.registerModule(moduleName, modules[moduleName])
  }
})

export default {
  name: 'App',

  async created () {
    try {
      await this.$store.dispatch('currentURL/setCurrentURL', await getUrlFromExt())
      await this.$store.dispatch('repositories/setRepos')
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
