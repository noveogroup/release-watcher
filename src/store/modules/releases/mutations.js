import {
  SET_RELEASE,
  SET_RELEASES,
  REMOVE_RELEASES,
  UPDATE_RELEASE,
  SET_RELEASES_TOTAL
} from './mutation-types'

export default {
  [SET_RELEASES] (state, releases) {
    state.releases = [...releases]
  },
  [SET_RELEASE] (state, release) {
    state.releases.push(release)
  },
  [REMOVE_RELEASES] (state, repoId) {
    state.releases = state.releases.filter(releases => releases.repoId !== repoId)
  },
  [UPDATE_RELEASE] (state, updatedRelease) {
    const item = state.releases?.find(release => release.uuid === updatedRelease.uuid)
    const index = state.releases?.indexOf(item)

    const newItem = {
      ...item,
      ...updatedRelease
    }
    state.releases.splice(index, 1, newItem)
  },
  [SET_RELEASES_TOTAL] (state, total) {
    state.total = total
  }
}
