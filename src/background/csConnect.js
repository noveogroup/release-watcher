import { __RepoController } from '@/store/modules/repositories/actions'
import { checkReleases } from './checkReleases'

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.requestType === 'checkWatchStatus') {
    try {
      const exists = await __RepoController.getOne(request.id)
      sendResponse({ exists: Boolean(exists), success: true })
    } catch (error) {
      console.error('erorr in db!', error)
      sendResponse({ exists: false, success: false })
    }
    return
  }

  if (request.requestType === 'updateRepo') {
    try {
      if (request.isAdding) {
        delete request.isAdding
        await __RepoController.create(request)
        checkReleases(request, true)
      } else {
        await __RepoController.delete(request.id)
      }
      sendResponse({ success: true })
    } catch (error) {
      console.error('erorr in db!', error)
      sendResponse({ success: false })
    }
  }
})
