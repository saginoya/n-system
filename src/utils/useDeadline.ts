export const useDeadline = (deadline: string | undefined) => {
  const expiration = deadline ? new Date(deadline) : undefined
  const now = new Date()

  const isExpiration = (): boolean => {
    if (expiration) {
      return expiration < now
    } else {
      return false
    }
  }

  const format = (): string | undefined => {
    if (expiration) {
      const year = expiration.getFullYear()
      const month = expiration.getMonth() + 1
      const date = expiration.getDate()
      const hour = expiration.getHours()
      return `${year}年${month}月${date}日 ${hour}時`
    } else {
      return undefined
    }
  }

  return {
    isExpiration,
    format
  }
}
