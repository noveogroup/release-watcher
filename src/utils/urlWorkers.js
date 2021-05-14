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

export {
  getUrlFromExt,
  isAllowedURL
}
