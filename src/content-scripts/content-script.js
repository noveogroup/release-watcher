const hTwoTags = document.getElementsByTagName('h2')

const releasesHeader = Array.from(hTwoTags).find(header => {
  return (
    header.firstElementChild?.baseURI + '/releases' ===
    header.firstElementChild?.href
  )
})

const imageUrl = chrome.runtime.getURL('images/watch.png')
const imageActiveUrl = chrome.runtime.getURL('images/stopWatch.png')

const watchImage = document.createElement('img')

let watchState = false
watchImage.src = imageUrl
watchImage.style.marginRight = '5px'

watchImage.addEventListener('click', (e) => {
  watchState = !watchState
  watchState
    ? (watchImage.src = imageUrl)
    : (watchImage.src = imageActiveUrl)
})

releasesHeader.insertBefore(watchImage, releasesHeader.childNodes[0])
