import { computed, readonly } from 'vue'

export const useLink = (openInNew: boolean, download = false) => {
  const linkTarget = computed(() => {
    if (openInNew) {
      return '_blank'
    } else {
      return '_self'
    }
  })

  const classlinkIcon = computed(() => {
    if (openInNew) {
      return 'ic_openInNew'
    } else if (download) {
      return 'ic_download'
    } else {
      return undefined
    }
  })

  return {
    linkTarget: readonly(linkTarget),
    classlinkIcon: readonly(classlinkIcon)
  }
}
