import SVGInject from '@iconfu/svg-inject'
import {
  applyStylesFromObj,
  iconContainerStyles,
  releasesHeaderStyles,
  iconStyles,
  iconContainerStylesPrimary,
  iconContainerStylesDanger
} from './styleLogic'
import { isWatching, updateRepo } from '../bgConnect'
import { watchIcon, watchDisabledIcon } from '@/utils/getAssets'

let watchState = false

const hTwoTags = document.getElementsByTagName('h2')
export const releasesHeader = Array.from(hTwoTags).find(header => {
  return (
    header.firstElementChild?.baseURI + '/releases' ===
    header.firstElementChild?.href
  )
})
export const iconContainer = document.createElement('div')

const text = document.createElement('span')
iconContainer.appendChild(text)
applyStylesFromObj(iconContainerStyles, iconContainer)
applyStylesFromObj(releasesHeaderStyles, releasesHeader)
iconContainer.classList.add('Counter')

iconContainer.addEventListener('click', e => {
  watchState = !watchState
  watchState ? updateRepo(true) : updateRepo(false)
  toggleIcon()
})

const toggleIcon = () => {
  if (iconContainer.children.length > 1) {
    iconContainer.lastChild.remove()
  }

  const watchImage = document.createElement('img')
  iconContainer.appendChild(watchImage)

  if (watchState) {
    watchImage.src = watchDisabledIcon
    text.innerText = 'stop watching'
    applyStylesFromObj(iconContainerStylesDanger, iconContainer)
  } else {
    watchImage.src = watchIcon
    text.innerText = 'watch'
    applyStylesFromObj(iconContainerStylesPrimary, iconContainer)
  }

  watchImage.onload = function () {
    SVGInject(this, {
      afterLoad: svg => {
        applyStylesFromObj(iconStyles, svg)
      }
    })
  }
}

export async function init () {
  watchState = await isWatching()
  toggleIcon()
}
