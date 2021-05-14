import { isAllowedURL } from '../utils/urlWorkers'

export default {
  getIsAllowedURL (state) {
    return state.currentURL ? isAllowedURL(state.currentURL) : false
  }
}
