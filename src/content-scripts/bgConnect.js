import { baseApiUrl } from '@/constants'

const url = baseApiUrl + window.location.pathname + '/releases'
const name = window.location.pathname.split('/')[2]
const id = document
  .querySelector("meta[name='octolytics-dimension-repository_id']")
  ?.getAttribute('content')
  ?.toString()

export const isWatching = async () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ requestType: 'checkWatchStatus', id }, function (response) {
      resolve(response.exists)
    })
  })
}

export const updateRepo = (isAdding) => {
  chrome.runtime.sendMessage({ requestType: 'updateRepo', isAdding, id, url, name }, function (response) {
    console.log(response)
  })
}
