import BaseController from './BaseController'
import { SETTINGS_TABLE_NAME } from '../db/constants'
import {
  defaultRequestInterval,
  defaultNotificationSetting,
  defaultNotificationSoundSetting
} from '../constants'
import SettingsModel from '../models/SettingsModel'

export default class RepoController extends BaseController {
  constructor () {
    super(SETTINGS_TABLE_NAME, new SettingsModel())
  }

  async setDefaultIfEmpty () {
    try {
      const { db, tableName } = this
      const tables = await db.connect()
      const count = await tables[tableName].count()

      if (count) return Promise.resolve('settings row already exists')

      const result = tables[tableName].create({
        requestInterval: defaultRequestInterval,
        notifications: defaultNotificationSetting,
        notificationSound: defaultNotificationSoundSetting
      })
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
