import { __RepoController } from '@/store/modules/repositories/actions'
import { checkReleases } from './checkReleases'

async function requestCheck (request) {
  if (request.requestType === 'checkWatchStatus') {
    try {
      const exists = await __RepoController.getOne(request.id)
      return { exists: Boolean(exists), success: true }
    } catch (error) {
      console.error('erorr in db!', error)
      return { exists: false, success: false }
    }
  }

  if (request.requestType === 'updateRepo') {
    try {
      if (request.isAdding) {
        delete request.isAdding
        __RepoController.create(request)
        checkReleases(request, true)
      } else {
        __RepoController.delete(request.id)
      }
      return { success: true }
    } catch (error) {
      console.error('erorr in db!', error)
      return { success: false }
    }
  }
}

chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  requestCheck(request).then(sendResponse)
  return true
})
