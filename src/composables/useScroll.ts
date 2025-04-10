import { ref } from 'vue'
import { useEventListener } from '@/composables/useEventListener'

export const useScroll = () => {
  const scrollX = ref()
  const scrollY = ref()

  const getScroll = () => {
    scrollX.value = window.scrollX
    scrollY.value = window.scrollY
  }

  useEventListener(window, 'scroll', getScroll)

  return {
    scrollX,
    scrollY,
  }
}
