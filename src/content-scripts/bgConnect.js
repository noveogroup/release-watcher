import { baseApiUrl } from '@/constants'

const url = baseApiUrl + window.location.pathname + '/releases'
const name = window.location.pathname.split('/')[2]
const id = parseInt(
  document
    .querySelector("meta[name='octolytics-dimension-repository_id']")
    ?.getAttribute('content')
)

const getMostPopularLanguage = () => {
  try {
    const hTwoTags = document.getElementsByTagName('h2')
    const languageHeader = Array.from(hTwoTags).find(header => {
      return header.innerText === 'Languages'
    })
    return languageHeader.parentNode
      .getElementsByTagName('a')[0]
      .getElementsByTagName('span')[0].innerText
  } catch (error) {
    console.log('no language found on the page', error)
    return 'no language found'
  }
}

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
      url,
      name,
      language: getMostPopularLanguage()
    },
    function (response) {
      console.log(response)
    }
  )
}
