import { initialAlarm, initRepeatingAlarm } from './alarms'
import './csConnect'
import { __RepoController } from '@/store/modules/repositories/actions'
import { checkReleases } from './checkReleases'
import { RELEASE_CHECK_ALARM_NAME } from '@/constants'
import { __SettingsController } from '@/store/modules/settings/actions'

chrome.runtime.onInstalled.addListener(async function () {
  browser.browserAction.setBadgeBackgroundColor({ color: '#fcc' })

  chrome.alarms.onAlarm.addListener(async alarm => {
    if (alarm.name !== RELEASE_CHECK_ALARM_NAME) return
    const repos = await __RepoController.getActiveRepos()
    repos.forEach(repo => checkReleases(repo, false))
  })

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      chrome.tabs.sendMessage(tabId, {
        message: 'TabUpdated'
      })
    }
  })
  const settings = await __SettingsController.getSettings()
  initialAlarm()
  initRepeatingAlarm(settings.requestInterval || 15)
})
