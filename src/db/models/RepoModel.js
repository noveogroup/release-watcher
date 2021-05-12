import defaultNotificationSetting from '@/constants'
import { v4 as uuid } from 'uuid'

export default class RepoModel {
  constructor (id = uuid()) {
    this.id = id
    this.notifications = defaultNotificationSetting
    this.url = ''
    this.name = ''
    this.disabled = false
  }

  createNewRepo (url, name, id = this.id) {
    return {
      id: id,
      notifications: defaultNotificationSetting,
      url: url || 'url not found',
      name: name || 'name not found',
      disabled: false
    }
  }
}
