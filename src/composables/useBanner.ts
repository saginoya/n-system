import { computed, readonly } from 'vue'
import type { Size } from '@/types/size'

export const useBanner = (size: Size | undefined) => {
  const classBanner = computed(() => {
    switch (size) {
      case 'free':
        return 'el_bannerFreeSize'
      case 'xs':
        return 'el_bannerXS'
      case 'sm':
        return 'el_bannerSmall'
      case 'lg':
        return 'el_bannerLarge'
      case 'xl':
        return 'el_bannerXL'
      default:
        return 'el_bannerMiddle'
    }
  })

  return {
    classBanner: readonly(classBanner)
  }
}
