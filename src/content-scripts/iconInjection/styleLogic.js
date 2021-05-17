const applyStylesFromObj = (obj, target) => {
  if (!target) throw new Error('U cant apply styles to undefined element')

  Object.keys(obj).forEach(e => {
    target.style[e] = obj[e]
  })
}
const releasesHeaderStyles = {
  display: 'flex',
  alignItems: 'flex-end'
}

const iconContainerStyles = {
  marginLeft: '5px',
  minWidth: '24px',
  height: '20px',
  cursor: 'pointer',
  display: 'flex'
}

const iconContainerStylesPrimary = {
  backgroundColor: 'var(--color-btn-primary-bg, #347d39)'
}

const iconContainerStylesDanger = {
  backgroundColor: 'var(--color-downvote-icon-bg, #78191b)'
}

const iconStyles = {
  fill: 'var(--color-text-primary)',
  height: '20px'
}

export {
  applyStylesFromObj,
  iconContainerStyles,
  iconContainerStylesPrimary,
  iconContainerStylesDanger,
  releasesHeaderStyles,
  iconStyles
}
