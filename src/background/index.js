import './alarms'
import './csConnect'
import { RELEASE_CHECK_ALARM_NAME } from '@/constants'
import { __SettingsController } from '@/store/modules/settings/actions'

chrome.runtime.onInstalled.addListener(async function () {
  browser.browserAction.setBadgeBackgroundColor({ color: '#fcc' })

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      chrome.tabs.sendMessage(tabId, {
        message: 'TabUpdated'
      })
    }
  })

  // one-time initial release check
  browser.alarms.create(RELEASE_CHECK_ALARM_NAME, {
    delayInMinutes: 0
  })

  // regular repeating release chceck
  const settings = await __SettingsController.getSettings()
  browser.alarms.create(RELEASE_CHECK_ALARM_NAME, {
    periodInMinutes: settings.requestInterval
  })
})
