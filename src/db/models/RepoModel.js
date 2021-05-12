import defaultNotificationSetting from '@/constants'
import { v4 as uuid } from 'uuid'

export default class RepoModel {
  constructor (id = uuid()) {
    this.repoId = id
    this.notifications = defaultNotificationSetting
    this.url = ''
    this.name = ''
    this.disabled = false
  }
}
