import defaultRequestInterval from '@/constants'

export default class GlobalSettingsModel {
  constructor () {
    this.requestInterval = defaultRequestInterval
  }
}
