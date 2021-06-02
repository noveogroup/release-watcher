import {
  SET_REPOS,
  SET_REPO,
  REMOVE_REPO,
  SET_REPOS_TOTAL
} from './mutation-types'

export default {
  [SET_REPOS] (state, repos) {
    state.repos = [...repos]
  },

  [SET_REPO] (state, repo) {
    state.repos.push(repo)
  },

  [REMOVE_REPO] (state, id) {
    const idx = state.repos.findIndex(repo => repo.id === id)
    state.repos.splice(idx, 1)
  },

  [SET_REPOS_TOTAL] (state, total) {
    state.total = total
  }
}
