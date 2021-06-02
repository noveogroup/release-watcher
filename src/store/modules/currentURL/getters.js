import { isMainRepoPage } from '@/utils/urlWorkers'

export default {
  getIsMainRepoPage: (state) => state.currentURL ? isMainRepoPage(state.currentURL) : false
}
