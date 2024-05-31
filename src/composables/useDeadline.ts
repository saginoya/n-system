import { computed } from 'vue'

export const useDeadline = (deadline: string, preparation: 'preparation' | 'close' | undefined) => {
  const expiration = new Date(deadline)
  const now = new Date()

  const state = computed(() => {
    if (preparation) {
      return 'preparation'
    } else if (expiration < now) {
      return 'close'
    } else {
      return 'default'
    }
  })

  const format = computed(() => {
    const year = expiration.getFullYear()
    const month = expiration.getMonth() + 1
    const date = expiration.getDate()
    const hour = expiration.getHours()
    return `${year}年${month}月${date}日 ${hour}時`
  })

  return {
    state,
    format
  }
}
