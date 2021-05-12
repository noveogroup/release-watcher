import defaultNotificationSetting from '@/constants'
import { v4 as uuid } from 'uuid'

export default class RepoModel {
  constructor (repoId = uuid()) {
    this.repoId = repoId
    this.notifications = defaultNotificationSetting
    this.url = ''
    this.name = ''
    this.disabled = false
  }
}
