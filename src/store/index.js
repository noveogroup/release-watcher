import Vue from 'vue'
import Vuex from 'vuex'

import settings from './modules/settings'
import currentURL from './modules/currentURL'
import releases from './modules/releases'
import repositories from './modules/repositories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
    currentURL,
    releases,
    repositories
  }
})
