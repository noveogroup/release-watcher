import SettingsController from '@/controllers/SettingsController'
import { v4 as uuid } from 'uuid'

const settingsController = new SettingsController()

export const getSettingsFromDB = async () => {
  try {
    return await settingsController.getOne(1)
  } catch (error) {
    console.log('dbMethods / getSettingsFromDB', error)
  }
}

export const updateSettingsInDB = async (payload) => {
  try {
    await settingsController.update(payload.index, {
      uuid: uuid(),
      ...payload
    })
  } catch (error) {
    console.log('dbMethods / updateSettingsInDB', error)
  }
}
