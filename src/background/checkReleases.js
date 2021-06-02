import githubAPI from '@/api/github'

import { __ReleaseController } from '@/store/modules/releases/actions'
import { __RepoController } from '@/store/modules/repositories/actions'

import { isArray } from '@/utils/typeChecker'
import { showNotification } from './notifications'

export const checkReleases = async (repo, initMode = false) => {
  const releases = await githubAPI.fetchWithoutBase(repo.url)
  if (!isArray(releases)) return

  releases.forEach(async release => {
    try {
      await __ReleaseController.create({
        id: release.id,
        repoId: repo.id,
        name: repo.name,
        author: release.author?.login || 'no author',
        body: release.body,
        url: release.html_url,
        version: release.tag_name,
        new: Number(!initMode),
        disabled: 0
      })
      if (!initMode) {
        showNotification(repo.name)
        __RepoController.incrementNewReleasesCount(repo.id, 1)
      }
    } catch (error) {
      if (error.target?.error?.code === 0) {
        console.info('Release already exists')
        return
      }
      console.error(error)
    }
  })
}
