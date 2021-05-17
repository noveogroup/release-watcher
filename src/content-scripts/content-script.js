import { isMainRepoPage } from '../utils/urlWorkers'
import { iconContainer, releasesHeader, init } from './iconInjection'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
    if (isMainRepoPage(document.location.href)) {
      releasesHeader.appendChild(iconContainer)
      init()
    }
  }
})
