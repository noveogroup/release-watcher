import {
  mutationsVars
} from './mutation-types'

import axios from 'axios'

import { add } from '../utils/dbMethods'

import { baseApiUrl } from '../constants'

const {
  SET_CURRENT_URL,
  SET_REPOS,
  SET_REPO
} = mutationsVars

export default {
  setCurrentURL ({ commit }, url) {
    commit(SET_CURRENT_URL, url)
  },

  setRepos ({ commit }, payload) {
    commit(SET_REPOS, payload)
  },

  async setRepo ({ commit }, addingUrl) {
    console.log('sssss', baseApiUrl + addingUrl)
    const res = await axios.get(baseApiUrl + addingUrl)

    console.log('res', res)
    const { id, url, name } = res.data

    const dbRes = await add(id.toString(), url, name)
    console.log('dbRes', dbRes)

    commit(SET_REPO, dbRes)
  }
}
