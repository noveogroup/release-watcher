import { isMainRepoPage } from '../utils/urlWorkers'
import { init } from './iconInjection'

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === 'TabUpdated' && isMainRepoPage(document.location.href)) {
    init()
  }
})
