<template>
  <div class="__app__">
    <router-view />
    <Credits />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { SET_CURRENT_URL } from '@/store/modules/currentURL/mutation-types'
import { getUrlFromExt } from '../utils/urlWorkers'
import Credits from '@/popup/components/Credits.vue'

export default {
  name: 'App',
  components: {
    Credits
  },
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
    height: 100%;
  }

  .__app__ {
    display: flex;
    flex-direction: column;
    padding: 14px 10px;
    min-height: 100%;
  }
}
</style>
