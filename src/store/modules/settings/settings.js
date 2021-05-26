import { mutationsVars } from '@/store/mutation-types.js'

import {
  updateSettingsInDB,
  getSettingsFromDB
} from '@/utils/dbMethods'

const {
  SET_SETTINGS,
  UPDATE_SETTINGS
} = mutationsVars

//
const state = () => ({
  settings: null
})

const actions = {
  async setSettings ({ commit }) {
    try {
      const res = await getSettingsFromDB()
      if (res) { commit(SET_SETTINGS, res) }
    } catch (error) {
      console.log('store actions / setSettings', error)
    }
  },

  async updateSettings ({ commit }, updateSettings) {
    try {
      const res = await updateSettingsInDB(updateSettings)
      if (res) { commit(UPDATE_SETTINGS, updateSettings) }
    } catch (error) {
      console.log('store actions / updateSettings', error)
    }
  }
}

const mutations = {
  [SET_SETTINGS] (state, settings) {
    state.settings = settings
  },

  [UPDATE_SETTINGS] (state, updateSettings) {
    state.settings = updateSettings
  }
}

export const settings = {
  namespaced: true,
  actions,
  mutations,
  state
}
