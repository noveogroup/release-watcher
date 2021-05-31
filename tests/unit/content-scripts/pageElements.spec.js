import { getReleasesHeader } from '@/content-scripts/pageElements'

describe('contentScript.pageElements', () => {
  it('should be undefined if not set', () => {
    expect(getReleasesHeader()).toBe(undefined)
  })

  it('should detect releases header', () => {
    const header = document.createElement('h2')
    const link = document.createElement('a')
    header.appendChild(link)
    link.href = 'http://localhost//releases'
    document.body.appendChild(header)
    console.log(getReleasesHeader())

    expect(getReleasesHeader().lastChild).toBe(link)
  })
})
