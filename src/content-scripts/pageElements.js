export const releasesHeader = Array.from(document.getElementsByTagName('h2')).find(header => {
  return (
    header.firstElementChild?.baseURI + '/releases' ===
    header.firstElementChild?.href
  )
})

export const pathName = window.location.pathname

export const name = window.location.pathname.split('/')[2]

export const id = parseInt(
  document
    .querySelector("meta[name='octolytics-dimension-repository_id']")
    ?.getAttribute('content')
)

export const getMostPopularLanguage = () => {
  try {
    const languageHeader = Array.from(document.getElementsByTagName('h2')).find(
      header => {
        return header.innerText === 'Languages'
      }
    )
    return languageHeader.parentNode
      .getElementsByTagName('a')[0]
      .getElementsByTagName('span')[0].innerText
  } catch (error) {
    console.error('no language found on the page', error)
    return 'no language found'
  }
}
