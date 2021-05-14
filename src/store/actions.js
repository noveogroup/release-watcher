import {
  mutationsVars
} from './mutation-types'

const { SET_CURRENT_URL } = mutationsVars

export default {
  setCurrentURL ({ commit }, url) {
    commit(SET_CURRENT_URL, url)
  }
}
