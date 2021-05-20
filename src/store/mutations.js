import {
  mutationsVars
} from './mutation-types'

const {
  SET_CURRENT_URL,
  SET_REPOS,
  SET_REPO,
  REMOVE_REPO
} = mutationsVars

export default {
  [SET_CURRENT_URL] (state, payload) {
    state.currentURL = payload
  },

  [SET_REPOS] (state, payload) {
    state.repos = state.repos ? [...state.repos, ...payload] : [...payload]
  },

  [SET_REPO] (state, payload) {
    state.addingRepo = payload
    state.repos ? state.repos.push(payload) : state.repos = [payload]
  },

  [REMOVE_REPO] (state, id) {
    const item = state.repos.find(repo => repo.id === id)
    const idx = state.repos.indexOf(item)
    state.repos.splice(idx, 1)
  }
}
