/**
 * 日付フォーマットの結果を表す型
 */
export type DateFormatResult = {
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
 * 日付文字列をフォーマットして、各要素を文字列として返す
 * @param datetime - フォーマット対象の日付文字列
 * @returns フォーマットされた日付情報、無効な日付の場合はnull
 */
export const formatDate = (datetime: string): DateFormatResult | null => {
  if (!datetime) {
    console.error('日付文字列が指定されていません。')
    return null
  }

  const date = new Date(datetime)
  if (isNaN(date.getTime())) {
    console.error('無効な日付文字列です。')
    return null
  }

  const formatTwoDigit = (num: number): string => {
    return String(num).padStart(2, '0')
  }

  const dayJaList = ['日', '月', '火', '水', '木', '金', '土'] as const

  return {
    year: String(date.getFullYear()),
    month: String(date.getMonth() + 1),
    date: String(date.getDate()),
    day: String(date.getDay()),
    dayJa: dayJaList[date.getDay()] ?? '',
    hour: String(date.getHours()),
    minutes: String(date.getMinutes()),
    twoDigitMonth: formatTwoDigit(date.getMonth() + 1),
    twoDigitDate: formatTwoDigit(date.getDate()),
    twoDigitHour: formatTwoDigit(date.getHours()),
    twoDigitMinutes: formatTwoDigit(date.getMinutes()),
  }
}
