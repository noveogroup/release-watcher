import { isMainRepoPage } from '../utils/urlWorkers'

export default {
  getIsMainRepoPage (state) {
    return state.currentURL ? isMainRepoPage(state.currentURL) : false
  }
}
