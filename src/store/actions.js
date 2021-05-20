import {
  mutationsVars
} from './mutation-types'

import axios from 'axios'

import {
  addRepo,
  removeRepo,
  getAllRepos
} from '../utils/dbMethods'

import { baseApiUrl } from '../constants'

const {
  SET_CURRENT_URL,
  SET_REPOS,
  SET_REPO,
  REMOVE_REPO
} = mutationsVars

export default {
  setCurrentURL ({ commit }, url) {
    commit(SET_CURRENT_URL, url)
  },

  async setRepos ({ commit }, sortBy) {
    try {
      commit(SET_REPOS, await getAllRepos())
    } catch (e) {
      console.log('store actions / setRepos', e)
    }
  },

  async setRepo ({ commit }, addingUrl) {
    try {
      const res = await axios.get(baseApiUrl + addingUrl)

      const { id, url, name, language } = res.data

      const data = {
        id: id.toString(),
        url,
        name,
        language
      }

      const dbRes = await addRepo(data)

      commit(SET_REPO, dbRes)
    } catch (e) {
      console.log('store actions / setRepo', e)
    }
  },

  async removeRepo ({ commit }, id) {
    try {
      const res = await removeRepo(id)
      if (res) { commit(REMOVE_REPO, id) }
    } catch (e) {
      console.log('store actions / removeRepo')
    }
  }
}
