import { describe, it, expect } from 'vitest'
import { parseValidDate, separateDate, commonDateFormats } from '../../utils/dateFormatUtils'

describe('parseValidDate', () => {
  it('有効な日付文字列ならDate型を返す', () => {
    const input = '2024-03-15T14:30:00+09:00'
    const result = parseValidDate(input)

    expect(result).toBeInstanceOf(Date)
    // 値が正しいか確認（getTimeなどで数値比較するのもアリ）
    expect(result?.getFullYear()).toBe(2024)
  })

  it('無効な文字列であればundefinedを返す', () => {
    expect(parseValidDate('invalid-date')).toBeUndefined()
    expect(parseValidDate('jojojo')).toBeUndefined()
  })
})

describe('separateDate', () => {
  it('有効な日付オブジェクトを正しく分離できる', () => {
    // タイムゾーンを明示して環境依存を防ぐ
    const date = new Date('2024-03-15T14:30:00+09:00')
    const result = separateDate(date)

    expect(result).toEqual({
      year: '2024',
      month: '3',
      date: '15',
      day: '5',
      dayJa: '金',
      hour: '14',
      minutes: '30',
      twoDigitMonth: '03',
      twoDigitDate: '15',
      twoDigitHour: '14',
      twoDigitMinutes: '30',
    })
  })
})

describe('commonDateFormats', () => {
  const input = '2024-03-15T14:30:00+09:00'

  it('dateTime 形式が正しく取得できる', () => {
    const result = commonDateFormats(input, 'dateTime')
    expect(result).toBe('2024-03-15 14:30')
  })

  it('dateJa 形式が正しく取得できる', () => {
    const result = commonDateFormats(input, 'dateJa')
    expect(result).toBe('2024年3月15日')
  })

  it('無効な文字列の場合は空文字を返す', () => {
    expect(commonDateFormats('invalid', 'date')).toBe('')
  })
})
