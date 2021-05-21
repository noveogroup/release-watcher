import {
  mutationsVars
} from './mutation-types'

const {
  SET_CURRENT_URL,
  SET_REPOS,
  SET_REPO,
  REMOVE_REPO,
  SET_RELEASES,
  SET_RELEASE,
  REMOVE_RELEASES
} = mutationsVars

export default {
  [SET_CURRENT_URL] (state, payload) {
    state.currentURL = payload
  },

  // repos
  [SET_REPOS] (state, payload) {
    state.repos = state.repos ? [...state.repos, ...payload] : [...payload]
  },

  [SET_REPO] (state, payload) {
    state.addingRepo = payload
    state.repos ? state.repos.push(payload) : state.repos = [payload]
  },

  [REMOVE_REPO] (state, id) {
    const idx = state.repos.findIndex(repo => repo.id === id)
    state.repos.splice(idx, 1)
  },

  // releases
  [SET_RELEASES] (state, payload) {
    state.releases = state.releases ? [...state.releases, ...payload] : [...payload]
  },

  [SET_RELEASE] (state, payload) {
    state.releases ? state.releases.push(payload) : state.releases = [payload]
  },

  [REMOVE_RELEASES] (state, repoId) {
    const item = state.releases?.find(releases => releases.repoId === repoId)
    if (item) { state.releases = null }
  }
}
