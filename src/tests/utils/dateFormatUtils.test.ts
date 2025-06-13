import { describe, it, expect } from 'vitest'

import { formatDate } from '../../utils/dateFormatUtils'

describe('formatDate', () => {
  it('有効な日付文字列を正しくフォーマットできる', () => {
    const result = formatDate('2024-03-15T14:30:00')
    expect(result).toEqual({
      year: '2024',
      month: '3',
      date: '15',
      day: '5', // 金曜日
      dayJa: '金',
      hour: '14',
      minutes: '30',
      twoDigitMonth: '03',
      twoDigitDate: '15',
      twoDigitHour: '14',
      twoDigitMinutes: '30',
    })
  })

  it('空文字列の場合はnullを返す', () => {
    const result = formatDate('')
    expect(result).toBeNull()
  })

  it('無効な日付文字列の場合はnullを返す', () => {
    const result = formatDate('invalid-date')
    expect(result).toBeNull()
  })

  it('1桁の月と日を正しく2桁にフォーマットできる', () => {
    const result = formatDate('2024-01-05T09:05:00')
    expect(result).toEqual({
      year: '2024',
      month: '1',
      date: '5',
      day: '5', // 金曜日
      dayJa: '金',
      hour: '9',
      minutes: '5',
      twoDigitMonth: '01',
      twoDigitDate: '05',
      twoDigitHour: '09',
      twoDigitMinutes: '05',
    })
  })

  it('日曜日を正しく判定できる', () => {
    const result = formatDate('2024-03-17T00:00:00')
    expect(result?.day).toBe('0')
    expect(result?.dayJa).toBe('日')
  })

  it('土曜日を正しく判定できる', () => {
    const result = formatDate('2024-03-16T00:00:00')
    expect(result?.day).toBe('6')
    expect(result?.dayJa).toBe('土')
  })
})
