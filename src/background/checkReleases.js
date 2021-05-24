import ReleaseController from '@/controllers/ReleaseController'
import api from '@/api/github'
import { showNotification } from './notifications'
import { isArray } from '@/utils/typeChecker'

export const checkReleases = async (repo, initMode = false) => {
  const releaseController = new ReleaseController()
  const res = await api.fetchWithoutBase(repo.url)
  if (!isArray(res)) return
  res.forEach(async release => {
    try {
      await releaseController.create({
        id: parseInt(release.id),
        repoId: parseInt(repo.id),
        name: repo.name,
        author: release.author?.login || 'no author',
        body: release.body,
        url: release.html_url,
        version: release.tag_name,
        new: !initMode,
        disabled: false
      })
      if (!initMode) showNotification(repo.name)
    } catch (error) {
      if (error.target?.error?.code === 0) {
        console.log('release already exists')
        return
      }
      console.error(error)
    }
  })
}
