import SVGInject from '@iconfu/svg-inject'
import {
  applyStylesFromObj,
  iconContainerStyles,
  releasesHeaderStyles,
  iconStyles,
  iconContainerStylesPrimary,
  iconContainerStylesDanger
} from './styleLogic'
import { add, remove, isWatching } from '../saveRepo'
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

// toggle event listener on container
iconContainer.addEventListener('click', e => {
  watchState = !watchState
  watchState ? add() : remove()
  toggleIcon()
})

// styles adding
applyStylesFromObj(iconContainerStyles, iconContainer)
applyStylesFromObj(releasesHeaderStyles, releasesHeader)
iconContainer.classList.add('Counter')

const toggleIcon = () => {
  const watchImage = document.createElement('img')

  if (iconContainer.children.length > 1) {
    iconContainer.lastChild.remove()
  } // remove if already have a icon

  iconContainer.appendChild(watchImage)

  if (watchState) {
    watchImage.src = watchIcon
    text.innerText = 'stop watching'
    applyStylesFromObj(iconContainerStylesDanger, iconContainer)
  } else {
    watchImage.src = watchDisabledIcon
    text.innerText = 'watch'
    applyStylesFromObj(iconContainerStylesPrimary, iconContainer)
  }

  watchImage.onload = function () {
    // injecting svg inline for customization (themes)
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
