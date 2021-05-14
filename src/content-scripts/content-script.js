import { isAllowedURL } from '../utils/urlWorkers'
// let currentUrl

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
    if (isAllowedURL(document.location.href)) {
      console.log('allowed page')
    }
  }
})
