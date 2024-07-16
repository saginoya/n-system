export const useDateFormat = (datetime: string) => {
  const dayJaList: string[] = ['日', '月', '火', '水', '木', '金', '土']

  const obj = new Date(datetime)

  const year = obj.getFullYear()
  const month = obj.getMonth() + 1
  const date = obj.getDate()
  const day = obj.getDay()
  const dayJa = dayJaList[day]
  const hour = obj.getHours()
  const minutes = obj.getMinutes()

  return {
    year,
    month,
    date,
    day,
    dayJa,
    hour,
    minutes
  }
}
