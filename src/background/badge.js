import { isNumber } from '@/utils/typeChecker'

export default {
  async set (number) {
    if (!isNumber(number)) number = '!'
    if (number <= 0) return this.clear()
    browser.browserAction.setBadgeText({ text: number.toString() })
  },
  clear () {
    browser.browserAction.setBadgeText({ text: '' })
  }
}
