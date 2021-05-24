import './alarms'
import './csConnect'
import { RELEASE_CHECK_ALARM_NAME } from '@/constants'
import SettingsController from '@/controllers/SettingsController'

chrome.runtime.onInstalled.addListener(async function () {
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
  const settingsController = new SettingsController()
  await settingsController.setDefaultIfEmpty()
  const currSettings = await settingsController.getOne(1)
  browser.alarms.create(RELEASE_CHECK_ALARM_NAME, {
    periodInMinutes: currSettings.requestInterval
  })
})
