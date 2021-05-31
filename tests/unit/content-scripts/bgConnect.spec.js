import { isWatching, updateRepo } from '@/content-scripts/bgConnect'
import { chrome } from 'jest-chrome'

describe('contentScript.bgConnect', () => {
  it('should send message on reqest ', () => {
    const listenerSpy = jest.fn()
    chrome.runtime.onMessage.addListener(listenerSpy)
    expect(listenerSpy).not.toBeCalled()
    isWatching()
    expect(chrome.runtime.onMessage.hasListeners()).toBe(true)
  })

  it('should send message on request', () => {
    const listenerSpy = jest.fn()
    chrome.runtime.onMessage.addListener(listenerSpy)
    expect(listenerSpy).not.toBeCalled()
    updateRepo()
    expect(chrome.runtime.onMessage.hasListeners()).toBe(true)
  })
})
