import { RELEASE_CHECK_ALARM_NAME, defaultRequestInterval } from '@/constants'
import RepoController from '@/controllers/RepoController'
// import { ReleaseController } from '@/controllers/ReleaseController'
import { fetchRepo } from '@/axios'

chrome.runtime.onInstalled.addListener(reason => {
  browser.alarms.create(RELEASE_CHECK_ALARM_NAME, {
    periodInMinutes: defaultRequestInterval
  })
})

chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name !== RELEASE_CHECK_ALARM_NAME) return
  const repoController = new RepoController()
  const repos = await repoController.getActiveReposUrls()
  const responses = []
  repos.forEach(async repo => {
    const res = await fetchRepo(repo.url)
    responses.push(res)
  })
})

browser.alarms.create(RELEASE_CHECK_ALARM_NAME, { delayInMinutes: 0 })
