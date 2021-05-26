import axios from '@/axios'

import {
  addReleaseToDB,
  removeReleaseFromDB,
  getReleaseFromDB,
  updateReleaseInDB
} from '@/utils/DBMethods/releases.js'

import { baseApiUrl } from '@/constants'

import { mutationsVars } from '@/store/mutation-types.js'

const {
  SET_RELEASE,
  SET_RELEASES,
  REMOVE_RELEASES,
  UPDATE_RELEASE
} = mutationsVars

//
const state = () => ({
  releases: null
})

const getters = {
  getCurrentRepoReleases: (state) => state.releases.reduce((acc, curr) => {
    acc[curr.repoId]
      ? acc[curr.repoId].push(curr)
      : acc[curr.repoId] = [curr]
    return acc
  }, {})
}

const actions = {

  async setReleases ({ commit }, repoId) {
    try {
      commit(SET_RELEASES, await getReleaseFromDB(repoId))
    } catch (e) {
      console.log('store actions / setReleases', e)
    }
  },

  async setRelease ({ commit }, options) {
    const { repoId, addingUrl } = options

    try {
      const res = await axios.get(baseApiUrl + addingUrl)

      const formatted = [...res.data].map(release => {
        const { id, name, body } = release
        return {
          repoId,
          id,
          url: release.html_url,
          name,
          version: release.tag_name,
          body,
          new: false
        }
      })

      const add = async (release) => {
        await addReleaseToDB(release)
      }

      formatted.forEach(add)
    } catch (e) {
      console.log('store actions / setRelease', e)
    }
  },

  async deleteReleases ({ commit }, repoId) {
    try {
      const res = await removeReleaseFromDB(repoId)
      if (res) { commit(REMOVE_RELEASES, repoId) }
    } catch (error) {
      console.log('store actions / deleteReleases', error)
    }
  },

  async updateRelease ({ commit }, updatedRelease) {
    try {
      const res = await updateReleaseInDB(updatedRelease)
      if (res) { commit(UPDATE_RELEASE, updatedRelease) }
    } catch (error) {
      console.log('store actions / updateRelease', error)
    }
  }
}

const mutations = {
  [SET_RELEASES] (state, payload) {
    state.releases = state.releases ? [...state.releases, ...payload] : [...payload]
  },

  [SET_RELEASE] (state, payload) {
    state.releases ? state.releases.push(payload) : state.releases = [payload]
  },

  [REMOVE_RELEASES] (state, repoId) {
    const item = state.releases?.find(releases => releases.repoId === repoId)
    if (item) { state.releases = null }
  },

  [UPDATE_RELEASE] (state, updatedRelease) {
    const item = state.releases?.find(release => release.uuid === updatedRelease.uuid)
    const index = state.releases?.indexOf(item)

    const newItem = {
      ...item,
      ...updatedRelease
    }
    state.releases.splice(index, 1, newItem)
  }
}

export const releases = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
