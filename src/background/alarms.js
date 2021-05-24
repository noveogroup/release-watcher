import { RELEASE_CHECK_ALARM_NAME, defaultRequestInterval } from '@/constants'
import RepoController from '@/controllers/RepoController'
import ReleaseController from '@/controllers/ReleaseController'
import api from '@/api/github'
import { isArray } from '@/utils/typeChecker'

chrome.runtime.onInstalled.addListener(reason => {
  browser.alarms.create(RELEASE_CHECK_ALARM_NAME, {
    periodInMinutes: defaultRequestInterval
  })
})

chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name !== RELEASE_CHECK_ALARM_NAME) return
  const repoController = new RepoController()
  const releaseController = new ReleaseController()

  const repos = await repoController.getActiveRepos()
  repos.forEach(async repo => {
    const res = await api.fetchWithoutBase(repo.url)
    if (!isArray(res)) return
    res.forEach(async release => {
      try {
        await releaseController.create({
          id: release.id,
          repoId: repo.id,
          name: repo.name,
          author: release.author?.login || 'no author',
          body: release.body,
          url: release.html_url,
          version: release.tag_name,
          new: true,
          disabled: false
        })
      } catch (error) {
        if (error.target?.error?.code === 0) {
          console.log('release already exists')
          return
        }
        console.error(error)
      }
    })
  })
})

// for testing
browser.alarms.create(RELEASE_CHECK_ALARM_NAME, { delayInMinutes: 0 })
