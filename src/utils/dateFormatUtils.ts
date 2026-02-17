// 定数や補助関数
const DAY_JA_LIST = ['日', '月', '火', '水', '木', '金', '土'] as const
const pad = (num: number): string => String(num).padStart(2, '0')

/**
 * 日付文字列を判定し、有効な場合は Date 型を、無効な場合は undefined を返します。
 */
export const parseValidDate = (dateStr: string): Date | undefined => {
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? undefined : date
}

export type SeparateDate = {
  year: string
  month: string
  date: string
  day: string
  dayJa: string
  hour: string
  minutes: string
  twoDigitMonth: string
  twoDigitDate: string
  twoDigitHour: string
  twoDigitMinutes: string
}

/**
 * Date型から年、月、日などを分割する関数
 */
export const separateDate = (date: Date): SeparateDate => {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const w = date.getDay()
  const h = date.getHours()
  const min = date.getMinutes()

  return {
    year: String(y),
    month: String(m),
    date: String(d),
    day: String(w),
    dayJa: DAY_JA_LIST[w] ?? '',
    hour: String(h),
    minutes: String(min),
    twoDigitMonth: pad(m),
    twoDigitDate: pad(d),
    twoDigitHour: pad(h),
    twoDigitMinutes: pad(min),
  }
}

type Format = 'date' | 'dateJa' | 'dateTime' | 'dateTimeJa'

/**
 * 日付文字列からフォーマットした文字列を返す
 */
export const commonDateFormats = (dateStr: string, format: Format): string => {
  const dateObj = parseValidDate(dateStr)
  if (!dateObj) return ''

  const s = separateDate(dateObj)

  const formatMap: Record<Format, string> = {
    // 2026-02-17 形式に揃えるなら twoDigit を使用
    date: `${s.year}-${s.twoDigitMonth}-${s.twoDigitDate}`,
    dateJa: `${s.year}年${s.month}月${s.date}日`,
    dateTime: `${s.year}-${s.twoDigitMonth}-${s.twoDigitDate} ${s.twoDigitHour}:${s.twoDigitMinutes}`,
    dateTimeJa: `${s.year}年${s.month}月${s.date}日 ${s.twoDigitHour}:${s.twoDigitMinutes}`,
  }

  return formatMap[format]
}
