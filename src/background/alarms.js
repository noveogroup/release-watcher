import { RELEASE_CHECK_ALARM_NAME } from '@/constants'
import RepoController from '@/controllers/RepoController'
import { checkReleases } from './checkReleases'

chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name !== RELEASE_CHECK_ALARM_NAME) return
  const repoController = new RepoController()
  const repos = await repoController.getActiveRepos()
  repos.forEach(repo => checkReleases(repo, false))
})
