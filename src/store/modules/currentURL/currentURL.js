import { isMainRepoPage } from '@/utils/urlWorkers'

import { mutationsVars } from '@/store/mutation-types.js'

const { SET_CURRENT_URL } = mutationsVars

//
const state = () => ({
  currentURL: null
})

const getters = {
  getIsMainRepoPage (state) {
    return state.currentURL ? isMainRepoPage(state.currentURL) : false
  }
}

const actions = {
  setCurrentURL ({ commit }, url) {
    commit(SET_CURRENT_URL, url)
  }
}

const mutations = {
  [SET_CURRENT_URL] (state, payload) {
    state.currentURL = payload
  }
}

export const currentURL = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
