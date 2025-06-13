import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { normalizePath, isCurrentPage } from '../../utils/urlUtils'

describe('normalizePath', () => {
  it('末尾のindex.htmlを除去できる', () => {
    expect(normalizePath('/path/to/index.html')).toBe('/path/to')
  })

  it('index.htmlが末尾にない場合は変更しない', () => {
    expect(normalizePath('/path/to/page.html')).toBe('/path/to/page.html')
  })

  it('空文字列の場合は/を返す', () => {
    expect(normalizePath('')).toBe('/')
  })
})

describe('isCurrentPage', () => {
  beforeEach(() => {
    // document.locationのモック
    Object.defineProperty(global, 'document', {
      value: {
        location: {
          href: 'https://example.com/path/to/page',
          origin: 'https://example.com',
          pathname: '/path/to/page',
        },
      },
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('現在のページのURLと一致する場合はtrueを返す', () => {
    expect(isCurrentPage('https://example.com/path/to/page')).toBe(true)
  })

  it('現在のページのURLと一致しない場合はfalseを返す', () => {
    expect(isCurrentPage('https://example.com/other/page')).toBe(false)
  })

  it('相対パスでも正しく判定できる', () => {
    expect(isCurrentPage('/path/to/page')).toBe(true)
  })

  it('末尾のindex.htmlを考慮して判定できる', () => {
    // 一時的にpathnameを'/path/to'に変更
    const originalDocument = global.document
    Object.defineProperty(global, 'document', {
      value: {
        location: {
          href: 'https://example.com/path/to',
          origin: 'https://example.com',
          pathname: '/path/to',
        },
      },
      writable: true,
      configurable: true,
    })
    expect(isCurrentPage('https://example.com/path/to/index.html')).toBe(true)
    // 元に戻す
    Object.defineProperty(global, 'document', {
      value: originalDocument,
      writable: true,
      configurable: true,
    })
  })

  it('無効なURLの場合はfalseを返す', () => {
    expect(isCurrentPage('invalid-url')).toBe(false)
  })

  it('空文字列の場合はfalseを返す', () => {
    expect(isCurrentPage('')).toBe(false)
  })

  it('documentが利用できない場合はfalseを返す', () => {
    const originalDocument = global.document
    // @ts-expect-error documentを削除するテストのため
    delete global.document

    expect(isCurrentPage('https://example.com/path/to/page')).toBe(false)

    // テスト後にdocumentを復元
    global.document = originalDocument
  })
})
