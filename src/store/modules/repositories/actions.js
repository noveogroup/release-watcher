import githubAPI from '@/api/github'
import { GITHUB_API_URL } from '@/constants'
import {
  SET_REPOS,
  SET_REPO,
  REMOVE_REPO,
  SET_REPOS_TOTAL
} from './mutation-types'

import RepoController from '@/controllers/RepoController'
import badge from '@/background/badge'

export const __RepoController = new RepoController()

export default {
  async getRepos ({ commit }, payload = {}) {
    try {
      const repos = await __RepoController.getAll(payload)
      commit(SET_REPOS, repos)

      return Promise.resolve(repos)
    } catch (error) {
      console.error('store / repositories / getRepos', error)
    }
  },
  async getReposTotal ({ commit }) {
    try {
      const total = await __RepoController.getCount()
      commit(SET_REPOS_TOTAL, total)

      return Promise.resolve(total)
    } catch (error) {
      console.error('store / repositories / getReposTotal', error)
    }
  },
  async setRepo ({ state, commit, dispatch }, addingUrl) {
    try {
      const fetchedRepo = await githubAPI.fetchWithoutBase(
        GITHUB_API_URL + addingUrl
      )
      const {
        id,
        url,
        full_name: name,
        language = 'Without language'
      } = fetchedRepo
      const repo = {
        id,
        url,
        name,
        language: language || 'Without language',
        disabled: 0,
        newReleasesCount: 0
      }
      const dbRes = await __RepoController.create(repo)

      await dispatch('releases/setRelease', {
        repoId: id,
        addingUrl: `${addingUrl}/releases`
      }, { root: true })

      commit(SET_REPOS_TOTAL, state.total + 1)
      commit(SET_REPO, dbRes)

      return Promise.resolve(dbRes)
    } catch (error) {
      console.error('store / repositories / setRepo', error)
      return Promise.reject(error)
    }
  },
  async deleteRepo ({ state, commit, dispatch }, repoId) {
    try {
      const repo = await __RepoController.delete(repoId)
      await dispatch('releases/deleteReleases', repoId, { root: true })

      commit(SET_REPOS_TOTAL, (state.total - 1) >= 0 ? (state.total - 1) : 0)
      commit(REMOVE_REPO, repoId)

      return Promise.resolve(repo)
    } catch (error) {
      console.error('store / repositories / deleteRepo', error)
    }
  },
  async decrementNewReleasesCount ({ commit }, repoId) {
    try {
      await __RepoController.incrementNewReleasesCount(repoId, -1)
      const allRepos = await __RepoController.getAll(0, 0)
      const allNewCount = allRepos.reduce(
        (newReleases, repo) => newReleases + repo.newReleasesCount,
        0
      )
      badge.set(allNewCount)
    } catch (error) {
      console.error('store / repositories / decrementNewReleasesCount', error)
    }
  }
}
