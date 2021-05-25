import {
  mutationsVars
} from './mutation-types'

import axios from 'axios'

import {
  addRepoToDB,
  removeRepoFromDB,
  getAllReposFromDB,
  addReleaseToDB,
  removeReleaseFromDB,
  getReleaseFromDB,
  updateReleaseInDB,
  updateSettingsInDB,
  getSettingsFromDB
} from '../utils/dbMethods'

import { baseApiUrl } from '../constants'

const {
  SET_CURRENT_URL,
  //
  SET_REPOS,
  SET_REPO,
  REMOVE_REPO,
  //
  SET_RELEASES,
  REMOVE_RELEASES,
  UPDATE_RELEASE,
  SET_SETTINGS,
  UPDATE_SETTINGS
} = mutationsVars

export default {
  setCurrentURL ({ commit }, url) {
    commit(SET_CURRENT_URL, url)
  },

  // repos
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

      await dispatch('setRelease', {
        repoId: id,
        addingUrl: `${addingUrl}/releases`
      })

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
        await dispatch('deleteReleases', repoId)
      }
    } catch (e) {
      console.log('store actions / deleteRepo')
    }
  },

  // releases
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
  },

  // settings

  async setSettings ({ commit }) {
    try {
      const res = await getSettingsFromDB()
      if (res) { commit(SET_SETTINGS, res) }
    } catch (error) {
      console.log('store actions / setSettings', error)
    }
  },

  async updateSettings ({ commit }, updateSettings) {
    try {
      const res = await updateSettingsInDB(updateSettings)
      if (res) { commit(UPDATE_SETTINGS, updateSettings) }
    } catch (error) {
      console.log('store actions / updateSettings', error)
    }
  }

}
