import BaseController from './BaseController'
import { SETTINGS_TABLE_NAME } from '../db/constants'
import {
  defaultRequestInterval,
  defaultNotificationSetting,
  defaultNotificationSoundSetting
} from '../constants'
import SettingsModel from '../models/SettingsModel'

export default class SettingsController extends BaseController {
  constructor () {
    super(SETTINGS_TABLE_NAME, new SettingsModel())
  }

  async getSettings () {
    try {
      const count = await this.getCount()

      if (count > 0) {
        const [settings] = await this.getAll()
        return Promise.resolve(settings)
      } else {
        const settings = await this.create({
          index: 1,
          requestInterval: defaultRequestInterval,
          notifications: defaultNotificationSetting,
          notificationSound: defaultNotificationSoundSetting
        })
        return Promise.resolve(settings)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
