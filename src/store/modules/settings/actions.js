import { SET_SETTINGS } from './mutation-types'

import SettingsController from '@/controllers/SettingsController'
import { initRepeatingAlarm } from '@/background/alarms'

export const __SettingsController = new SettingsController()

export default {
  async getSettings ({ commit }) {
    try {
      const settings = await __SettingsController.getSettings()
      commit(SET_SETTINGS, settings)

      return Promise.resolve(settings)
    } catch (error) {
      console.error('store / settings / setSettings', error)
    }
  },
  async updateSettings ({ commit }, newSettings) {
    try {
      const settings = await __SettingsController.update(1, newSettings)
      commit(SET_SETTINGS, settings)
      initRepeatingAlarm(newSettings.requestInterval || 15)
      return Promise.resolve(settings)
    } catch (error) {
      console.error('store / settings / updateSettings', error)
    }
  }
}
