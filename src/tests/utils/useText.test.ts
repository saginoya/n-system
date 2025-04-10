import { expect, test } from 'vitest'
import { useTextFormatter } from '@/utils'

const { trim, isSingleByteChara, katakanaToHiragana } = useTextFormatter()

test('trim function', () => {
  // 文字列前後の空白を削除
  expect(trim(' abcあいう123 ')).toBe('abcあいう123')
})

test('isSingleByteChara function', () => {
  // 文字列がすべて半角文字かの判定
  expect(isSingleByteChara('abc123[(/:')).toBe(true)
  expect(isSingleByteChara('abcあいう123')).toBe(false)
})

test('katakanaToHiragana function', () => {
  // カタカナをひらがなに変換
  expect(katakanaToHiragana('あいうアイウ')).toBe('あいうあいう')
})
