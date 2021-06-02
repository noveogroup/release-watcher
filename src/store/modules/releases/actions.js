import axios from '@/axios'
import { GITHUB_API_URL } from '@/constants'
import {
  SET_RELEASE,
  SET_RELEASES,
  REMOVE_RELEASES,
  UPDATE_RELEASE,
  SET_RELEASES_TOTAL
} from './mutation-types'

import ReleaseController from '@/controllers/ReleaseController'

export const __ReleaseController = new ReleaseController()

export default {
  async getReleases ({ commit }, payload = {}) {
    try {
      const releases = await __ReleaseController.getAll(payload)
      commit(SET_RELEASES, releases)

      return Promise.resolve(releases)
    } catch (error) {
      console.error('store / releases / getReleases', error)
    }
  },
  async getReleasesTotal ({ commit }, filters = {}) {
    try {
      const total = await __ReleaseController.getCount(filters)
      commit(SET_RELEASES_TOTAL, total)

      return Promise.resolve(total)
    } catch (error) {
      console.error('store / releases / getReleases', error)
    }
  },
  async setRelease ({ commit }, { repoId, addingUrl } = {}) {
    try {
      const { data: releases } = await axios.get(GITHUB_API_URL + addingUrl)

      const formattedReleases = releases.map(
        ({ id, name, body, html_url: url, tag_name: version }) => {
          return { repoId, id, url, name, version, body, new: 0 }
        })

      formattedReleases.forEach(async (release) => {
        await __ReleaseController.create(release)
        commit(SET_RELEASE, release)
      })

      return Promise.resolve(formattedReleases)
    } catch (error) {
      console.error('store / releases / setRelease', error)
    }
  },
  async deleteReleases ({ commit }, repoId) {
    try {
      const release = await __ReleaseController.deleteReleasesByRepoID(repoId)
      commit(REMOVE_RELEASES, release)

      return Promise.resolve(release)
    } catch (error) {
      console.error('store / releases / deleteReleases', error)
    }
  },
  async updateRelease ({ commit }, updatedRelease) {
    try {
      const release = await __ReleaseController.update(updatedRelease.id, updatedRelease)
      commit(UPDATE_RELEASE, release)

      return Promise.resolve(release)
    } catch (error) {
      console.error('store / releases / updateRelease', error)
    }
  }
}
