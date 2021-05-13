import SVGInject from '@iconfu/svg-inject'
import {
  applyStylesFromObj,
  iconContainerStyles,
  releasesHeaderStyles,
  iconStyles
} from './styleLogic'

let watchState = false // local state of icons

const hTwoTags = document.getElementsByTagName('h2')

const releasesHeader = Array.from(hTwoTags).find(header => {
  return (
    header.firstElementChild?.baseURI + '/releases' ===
    header.firstElementChild?.href
  )
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
    console.log(document.location.href)
  }
})

const imageUrl = chrome.runtime.getURL('images/trackOn.svg')
const imageActiveUrl = chrome.runtime.getURL('images/trackOff.svg')

const iconContainer = document.createElement('div')

const toggleIcon = () => {
  const watchImage = document.createElement('img')

  if (iconContainer.children.length) { iconContainer.firstChild.remove() } // remove if already have a icon

  iconContainer.appendChild(watchImage)

  watchState
    ? (watchImage.src = imageUrl)
    : (watchImage.src = imageActiveUrl)

  watchImage.onload = function () { // injecting svg inline for customization (themes)
    SVGInject(this, {
      afterLoad: (svg) => { applyStylesFromObj(iconStyles, svg) }
    })
  }
}

// init
toggleIcon()

// toggle event listener on container
iconContainer.addEventListener('click', (e) => {
  watchState = !watchState
  toggleIcon()
})

// styles adding
applyStylesFromObj(iconContainerStyles, iconContainer)
applyStylesFromObj(releasesHeaderStyles, releasesHeader)

// adding to page
releasesHeader.insertBefore(iconContainer, releasesHeader.childNodes[0])
