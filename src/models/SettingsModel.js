import BaseModel from './BaseModel'
import { SETTINGS_TABLE_NAME, SETTINGS_PRIMARY_KEY } from '../db/constants'

export default class SettingsModel extends BaseModel {
  constructor () {
    super(
      SETTINGS_TABLE_NAME,
      {
        requestInterval: {
          type: Number,
          required: true
        },
        notifications: {
          type: Boolean,
          required: true
        },
        notificationSound: {
          type: Boolean,
          required: true
        }
      },
      SETTINGS_PRIMARY_KEY
    )
  }
}
