import { RELEASE_CHECK_ALARM_NAME } from '@/constants'

// one-time initial release check
export const initialAlarm = () => {
  browser.alarms.create(RELEASE_CHECK_ALARM_NAME, {
    delayInMinutes: 0
  })
}

// regular repeating release chceck
export const initRepeatingAlarm = async (requestInterval) => {
  browser.alarms.clearAll()
  browser.alarms.create(RELEASE_CHECK_ALARM_NAME, {
    periodInMinutes: requestInterval
  })
}
