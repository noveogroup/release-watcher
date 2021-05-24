chrome.runtime.onInstalled.addListener(() => {
  browser.browserAction.setBadgeBackgroundColor({ color: '#fcc' })
})

export default {
  set () {
    browser.browserAction.setBadgeText({ text: '!' })
  },
  clear () {
    browser.browserAction.setBadgeText({ text: '' })
  }
}
