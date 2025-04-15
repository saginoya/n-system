export const formatDate = (datetime: string) => {
  if (!datetime) {
    console.error('Invalid datetime provided.')
    return null
  }

  const obj = new Date(datetime)
  if (isNaN(obj.getTime())) {
    console.error('Invalid date object created from datetime.')
    return null
  }

  const year: string = String(obj.getFullYear())
  const month: string = String(obj.getMonth() + 1)
  const date: string = String(obj.getDate())
  const hour: string = String(obj.getHours())
  const minutes: string = String(obj.getMinutes())

  const twoDigit = (num: string): string => {
    return num.padStart(2, '0')
  }

  const twoDigitMonth: string = twoDigit(month)
  const twoDigitDate: string = twoDigit(date)
  const twoDigitHour: string = twoDigit(hour)
  const twoDigitMinutes: string = twoDigit(minutes)

  const dayJaList: string[] = ['日', '月', '火', '水', '木', '金', '土']
  const day: string = String(obj.getDay())
  const dayJa: string = dayJaList[Number(day)]

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
