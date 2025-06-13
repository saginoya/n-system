import { describe, it, expect } from 'vitest'

import {
  trim,
  isSingleByte,
  convertKatakanaToHiragana,
  convertFullWidthToHalfWidth,
  convertSymbolToHalfWidth,
} from '@/utils/stringUtils'

describe('trim', () => {
  it('前後の空白を削除する', () => {
    expect(trim('  test  ')).toBe('test')
  })

  it('中間の空白は削除しない', () => {
    expect(trim('  test test  ')).toBe('test test')
  })

  it('空白がない場合はそのまま返す', () => {
    expect(trim('test')).toBe('test')
  })

  it('空文字列の場合は空文字列を返す', () => {
    expect(trim('')).toBe('')
  })
})

describe('isSingleByte', () => {
  it('半角文字のみの場合はtrueを返す', () => {
    expect(isSingleByte('test123')).toBe(true)
  })

  it('全角文字が含まれる場合はfalseを返す', () => {
    expect(isSingleByte('test１２３')).toBe(false)
  })

  it('空文字列の場合はtrueを返す', () => {
    expect(isSingleByte('')).toBe(true)
  })
})

describe('convertKatakanaToHiragana', () => {
  it('カタカナをひらがなに変換する', () => {
    expect(convertKatakanaToHiragana('テスト')).toBe('てすと')
  })

  it('カタカナとひらがなが混在する場合も正しく変換する', () => {
    expect(convertKatakanaToHiragana('テすト')).toBe('てすと')
  })

  it('カタカナ以外の文字はそのまま返す', () => {
    expect(convertKatakanaToHiragana('テスト123')).toBe('てすと123')
  })

  it('空文字列の場合は空文字列を返す', () => {
    expect(convertKatakanaToHiragana('')).toBe('')
  })
})

describe('convertFullWidthToHalfWidth', () => {
  it('全角英数字を半角に変換する', () => {
    expect(convertFullWidthToHalfWidth('１２３ＡＢＣ')).toBe('123ABC')
  })

  it('全角と半角が混在する場合も正しく変換する', () => {
    expect(convertFullWidthToHalfWidth('１２３ABC')).toBe('123ABC')
  })

  it('全角英数字以外の文字はそのまま返す', () => {
    expect(convertFullWidthToHalfWidth('１２３テスト')).toBe('123テスト')
  })

  it('undefinedの場合はundefinedを返す', () => {
    expect(convertFullWidthToHalfWidth(undefined)).toBeUndefined()
  })

  it('空文字列の場合は空文字列を返す', () => {
    expect(convertFullWidthToHalfWidth('')).toBe('')
  })
})

describe('convertSymbolToHalfWidth', () => {
  it('全角記号を半角に変換する', () => {
    expect(convertSymbolToHalfWidth('！？＠＃')).toBe('!?@#')
  })

  it('全角と半角が混在する場合も正しく変換する', () => {
    expect(convertSymbolToHalfWidth('！？!?')).toBe('!?!?')
  })

  it('全角記号以外の文字はそのまま返す', () => {
    expect(convertSymbolToHalfWidth('！？テスト')).toBe('!?テスト')
  })

  it('undefinedの場合はundefinedを返す', () => {
    expect(convertSymbolToHalfWidth(undefined)).toBeUndefined()
  })

  it('空文字列の場合は空文字列を返す', () => {
    expect(convertSymbolToHalfWidth('')).toBe('')
  })
})
