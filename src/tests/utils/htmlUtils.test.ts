import { describe, it, expect, vi } from 'vitest'

import { getDocumentLanguage, setBodyVisibility } from '@/utils/htmlUtils'

describe('getDocumentLanguage', () => {
  it('言語がjaの場合はjaを返す', () => {
    document.documentElement.lang = 'ja'
    expect(getDocumentLanguage()).toBe('ja')
  })
  it('言語がenの場合はenを返す', () => {
    document.documentElement.lang = 'en'
    expect(getDocumentLanguage()).toBe('en')
  })
  it('言語が未設定の場合はenを返す', () => {
    document.documentElement.lang = ''
    expect(getDocumentLanguage()).toBe('en')
  })
})

describe('setBodyVisibility', () => {
  it('visible=trueの場合、bodyのvisibilityがvisibleになる', () => {
    setBodyVisibility(true)
    expect(document.body.style.visibility).toBe('visible')
  })
  it('visible=falseの場合、bodyのvisibilityがhiddenになる', () => {
    setBodyVisibility(false)
    expect(document.body.style.visibility).toBe('hidden')
  })
  it('document.bodyが存在しない場合、エラーログが出力される', () => {
    const originalBody = document.body
    const consoleErrorSpy = vi.spyOn(console, 'error')

    // document.body を null に上書き
    Object.defineProperty(document, 'body', {
      value: null,
      configurable: true,
    })

    setBodyVisibility(true)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Document body is not available.')

    // 後始末：元に戻す
    Object.defineProperty(document, 'body', {
      value: originalBody,
      configurable: true,
    })

    consoleErrorSpy.mockRestore()
  })
})
