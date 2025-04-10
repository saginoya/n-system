import { expect, test } from 'vitest'
import { trim, isSingleByte, convertKatakanaToHiragana } from '@/utils'

test('trim function', () => {
  // 文字列前後の空白を削除
  expect(trim(' abcあいう123 ')).toBe('abcあいう123')
})

test('isSingleByteChara function', () => {
  // 文字列がすべて半角文字かの判定
  expect(isSingleByte('abc123[(/:')).toBe(true)
  expect(isSingleByte('abcあいう123')).toBe(false)
})

test('katakanaToHiragana function', () => {
  // カタカナをひらがなに変換
  expect(convertKatakanaToHiragana('あいうアイウ')).toBe('あいうあいう')
})
