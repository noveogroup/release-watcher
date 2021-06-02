import { SET_CURRENT_URL } from './mutation-types'

export default {
  [SET_CURRENT_URL] (state, payload) {
    state.currentURL = payload
  }
}
