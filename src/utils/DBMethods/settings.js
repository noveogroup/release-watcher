import SettingsController from '@/controllers/SettingsController'
import { v4 as uuid } from 'uuid'

const settingsController = new SettingsController()

/**
 * Get settings from indexedDB
 * @returns {Promise<SettingsModel|Error>}
 */
export const getSettingsFromDB = async () => {
  try {
    return await settingsController.getOne(1)
  } catch (error) {
    console.log('DBMethods / settings / getSettingsFromDB', error)
  }
}

/**
 * Update settings in indexedDB
 * @param {Object} payload - not fully SettingsModel object with new info to update in db
 * @returns {Promise<Boolean>|Error} - tru if update success or error
 */
export const updateSettingsInDB = async (payload) => {
  try {
    return await settingsController.update(payload.index, {
      uuid: uuid(),
      ...payload
    })
  } catch (error) {
    console.log('DBMethods / settings / updateSettingsInDB', error)
  }
}
