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
import { releasesHeader } from '../pageElements'

let watchState = false
const iconContainer = document.createElement('div')
const text = document.createElement('span')

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
  iconContainer.appendChild(text)
  try {
    applyStylesFromObj(iconContainerStyles, iconContainer)
    applyStylesFromObj(releasesHeaderStyles, releasesHeader)
  } catch (error) {
    console.error('Releases header not found', error)
  }

  iconContainer.classList.add('Counter')

  iconContainer.addEventListener('click', e => {
    watchState = !watchState
    watchState ? updateRepo(true) : updateRepo(false)
    toggleIcon()
  })

  watchState = await isWatching()
  releasesHeader.appendChild(iconContainer)
  toggleIcon()
}
