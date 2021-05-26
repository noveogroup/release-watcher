import axios from '@/axios'

import {
  addRepoToDB,
  removeRepoFromDB,
  getAllReposFromDB
} from '@/utils/DBMethods/repositories.js'

import { baseApiUrl } from '@/constants'

import {
  mutationsVars
} from '@/store/mutation-types.js'

const {
  SET_REPOS,
  SET_REPO,
  REMOVE_REPO
} = mutationsVars

//
const state = () => ({
  repos: null
})

const actions = {

  async setRepos ({ commit }, sortBy) {
    try {
      commit(SET_REPOS, await getAllReposFromDB())
    } catch (e) {
      console.log('store actions / setRepos', e)
    }
  },

  async setRepo ({ commit, dispatch }, addingUrl) {
    try {
      const res = await axios.get(baseApiUrl + addingUrl)
      const { id, url, name, language } = res.data
      const data = {
        id,
        url,
        name,
        language,
        newReleasesCount: 0
      }
      const dbRes = await addRepoToDB(data)

      await dispatch('releases/setRelease', {
        repoId: id,
        addingUrl: `${addingUrl}/releases`
      }, { root: true })

      commit(SET_REPO, dbRes)
    } catch (e) {
      console.log('store actions / setRepo', e)
    }
  },

  async deleteRepo ({ commit, dispatch }, repoId) {
    try {
      const res = await removeRepoFromDB(repoId)
      if (res) {
        commit(REMOVE_REPO, repoId)
        await dispatch('deleteReleases', repoId, { root: true })
      }
    } catch (e) {
      console.log('store actions / deleteRepo')
    }
  }
}

const mutations = {
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
  }
}

export const repositories = {
  namespaced: true,
  actions,
  mutations,
  state
}
