import { isNumber } from '@/utils/typeChecker'

export default {
  async set (number) {
    if (!isNumber(number) || number <= 0) number = '!'
    browser.browserAction.setBadgeText({ text: number.toString() })
  },
  clear () {
    browser.browserAction.setBadgeText({ text: '' })
  }
}
