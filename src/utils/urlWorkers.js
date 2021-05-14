const allowedUrls = [
  'github.com'
]

const getUrlFromExt = async () => {
  const tab = await browser.tabs.query({
    active: true,
    currentWindow: true
  })
  return tab[0].url
}

const isAllowedURL = (currentUrl) => allowedUrls.some(word => currentUrl.includes(word))

const isMainRepoPage = (str) => {
  if (!isAllowedURL(str)) return

  const resource = 'https://github.com'
  const lastIdx = str.length - 1

  const newStr = str.replace(resource, '').slice(1, str[lastIdx] === '/' ? -1 : lastIdx) // delete first and last slashes

  return [...newStr.split('/')].length === 2 // if we have array with 2 items after formatting - is gonna be right url pattern github.com/{owner}/{repo}
}

export {
  getUrlFromExt,
  isMainRepoPage
}
