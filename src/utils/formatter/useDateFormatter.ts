export const useDateFormatter = (datetime: string) => {
  const dayJaList: string[] = ['日', '月', '火', '水', '木', '金', '土']
  const twoDigit = (num: string): string => {
    return num.padStart(2, '0')
  }

  const obj = new Date(datetime)

  const year: string = String(obj.getFullYear())
  const month: string = String(obj.getMonth() + 1)
  const date: string = String(obj.getDate())
  const day: string = String(obj.getDay())
  const dayJa: string = dayJaList[Number(day)]
  const hour: string = String(obj.getHours())
  const minutes: string = String(obj.getMinutes())

  const twoDigitMonth: string = twoDigit(month)
  const twoDigitDate: string = twoDigit(date)
  const twoDigitHour: string = twoDigit(hour)
  const twoDigitMinutes: string = twoDigit(minutes)

  return {
    year,
    month,
    date,
    day,
    dayJa,
    hour,
    minutes,
    twoDigitMonth,
    twoDigitDate,
    twoDigitHour,
    twoDigitMinutes,
  }
}
