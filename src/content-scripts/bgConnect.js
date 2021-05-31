import { baseApiUrl } from '@/constants'
import { pathName, id, name, getMostPopularLanguage } from './pageElements'

export const isWatching = async () => {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(
      { requestType: 'checkWatchStatus', id },
      function (response) {
        resolve(response.exists)
      }
    )
  })
}

export const updateRepo = isAdding => {
  chrome.runtime.sendMessage(
    {
      requestType: 'updateRepo',
      isAdding,
      id,
      url: baseApiUrl + pathName + +'/releases',
      name,
      language: getMostPopularLanguage(),
      newReleasesCount: 0
    },
    function (response) {
      console.log(response)
    }
  )
}
