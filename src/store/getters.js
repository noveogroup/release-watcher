import { isMainRepoPage } from '../utils/urlWorkers'

export default {
  getIsMainRepoPage (state) {
    return state.currentURL ? isMainRepoPage(state.currentURL) : false
  },

  getCurrentRepoReleases: (state) => state.releases.reduce((acc, curr) => {
    acc[curr.repoId]
      ? acc[curr.repoId].push(curr)
      : acc[curr.repoId] = [curr]
    return acc
  }, {})
}
