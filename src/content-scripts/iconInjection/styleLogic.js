const applyStylesFromObj = (obj, target) => {
  if (!target) throw new Error('U cant apply styles to undefined element')

  Object.keys(obj).forEach(e => {
    target.style[e] = obj[e]
  })
}
const releasesHeaderStyles = {
  display: 'flex'
}

const iconContainerStyles = {
  marginRight: '5px',
  minWidth: '24px',
  height: '24px',
  cursor: 'pointer'
}

const iconStyles = {
  fill: 'var(--color-text-primary)'
}

export {
  applyStylesFromObj,
  iconContainerStyles,
  releasesHeaderStyles,
  iconStyles
}
