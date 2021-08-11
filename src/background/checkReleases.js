import githubAPI from '@/api/github'

import { __ReleaseController } from '@/store/modules/releases/actions'
import { __RepoController } from '@/store/modules/repositories/actions'

import { isArray } from '@/utils/typeChecker'
import badge from './badge'
import { showNotification } from './notifications'

export const checkReleases = async (repo, initMode = false) => {
  const releases = await githubAPI.fetchWithoutBase(repo.url + '/releases')
  if (!isArray(releases)) return

  for (const release of releases) {
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
        await __RepoController.incrementNewReleasesCount(repo.id, 1)
        const allRepos = await __RepoController.getAll(0, 0)
        const allNewCount = allRepos.reduce(
          (newReleases, repo) => newReleases + repo.newReleasesCount,
          0
        )
        showNotification(repo.name, release.html_url)
        badge.set(allNewCount)
      }
    } catch (error) {
      if (error.name === 'ConstraintError') {
        console.info('Release already exists')
      } else console.error(error)
    }
  }
}
