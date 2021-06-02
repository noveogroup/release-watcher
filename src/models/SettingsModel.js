import BaseModel, { AIPK } from './BaseModel'
import { SETTINGS_TABLE_NAME, SETTINGS_PRIMARY_KEY } from '../db/constants'
export default class SettingsModel extends BaseModel {
  constructor () {
    super(
      SETTINGS_TABLE_NAME,
      {
        index: {
          entry: AIPK,
          schema: {
            type: Number,
            required: true
          }
        },
        requestInterval: {
          schema: {
            type: Number,
            required: true
          }
        },
        notifications: {
          schema: {
            type: Number,
            required: true
          }
        },
        notificationSound: {
          schema: {
            type: Number,
            required: true
          }
        }
      },
      SETTINGS_PRIMARY_KEY
    )
  }
}
