import { applyStylesFromObj } from '@/content-scripts/iconInjection/styleLogic'

describe('contentScript.iconInjection.styleLogic', () => {
  it('should throw error if target is empty', () => {
    expect(() => applyStylesFromObj(undefined, undefined)).toThrow(Error)
  })

  it('should apply style to element', () => {
    const element = document.createElement('div')
    applyStylesFromObj({ width: '1px' }, element)
    expect(element.style.width).toBe('1px')
  })
})
