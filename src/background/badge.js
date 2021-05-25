export default {
  set () {
    browser.browserAction.setBadgeText({ text: '!' })
  },
  clear () {
    browser.browserAction.setBadgeText({ text: '' })
  }
}
