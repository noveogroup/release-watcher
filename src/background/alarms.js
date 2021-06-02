import { RELEASE_CHECK_ALARM_NAME } from '@/constants'
import { __RepoController } from '@/store/modules/repositories/actions'
import { checkReleases } from './checkReleases'

chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name !== RELEASE_CHECK_ALARM_NAME) return
  const repos = await __RepoController.getActiveRepos()
  repos.forEach(repo => checkReleases(repo, false))
})
