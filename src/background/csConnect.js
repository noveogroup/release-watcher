import RepoController from '@/controllers/RepoController'

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const repoController = new RepoController()

  if (request.requestType === 'checkWatchStatus') {
    try {
      const exists = await repoController.getOne(request.id)
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
        await repoController.create({
          id: request.id,
          name: request.name,
          url: request.url,
          disabled: false
        })
      } else {
        await repoController.delete(request.id)
      }
      sendResponse({ success: true })
    } catch (error) {
      console.error('erorr in db!', error)
      sendResponse({ success: false })
    }
  }
})
