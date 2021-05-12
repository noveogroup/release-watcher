import { RELEASE_CHECK_ALARM_NAME, defaultRequestInterval } from '@/constants'

chrome.runtime.onInstalled.addListener(reason => {
  browser.alarms.create(RELEASE_CHECK_ALARM_NAME, {
    periodInMinutes: defaultRequestInterval
  })
})

browser.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name !== RELEASE_CHECK_ALARM_NAME) return
  console.log('time to chehck the releases!')
})
