import '@/background/csConnect'
import { chrome } from 'jest-chrome'

describe('background.csConnect', () => {
  it('should send message on reqest ', () => {
    const message = { requestType: 'checkWatchStatus' }
    const response = { exists: false }
    const callbackSpy = jest.fn()
    chrome.runtime.sendMessage(message, callbackSpy)

    expect(callbackSpy).toBeCalledWith(response)
  })

  it('should send message on request', () => {
    expect(chrome.runtime.onMessage.hasListeners()).toBe(true)
  })
})
