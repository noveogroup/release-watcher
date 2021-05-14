import {
  mutationsVars
} from './mutation-types'

const { SET_CURRENT_URL } = mutationsVars

export default {
  [SET_CURRENT_URL] (state, payload) {
    state.currentURL = payload
  }
}
