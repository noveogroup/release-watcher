<template>
  <router-view class="router-view"/>
</template>

<script>
import { mapMutations } from 'vuex'
import { getUrlFromExt } from '../utils/urlWorkers'
import { SET_CURRENT_URL } from '@/store/modules/currentURL/mutation-types'

export default {
  name: 'App',
  async created () {
    try {
      const currentURL = await getUrlFromExt()
      this[SET_CURRENT_URL](currentURL)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    ...mapMutations('currentURL', [
      SET_CURRENT_URL
    ])
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

  p {
    margin-top: 0;
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
