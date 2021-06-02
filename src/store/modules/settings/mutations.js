import { SET_SETTINGS } from './mutation-types'

export default {
  [SET_SETTINGS] (state, settings) {
    state.settings = settings
  }
}
