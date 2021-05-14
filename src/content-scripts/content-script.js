import { isMainRepoPage } from '../utils/urlWorkers'
import { remove } from './saveRepo'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
    if (isMainRepoPage(document.location.href)) {
      console.log('main repo page')
    }
  }
  remove()
})
