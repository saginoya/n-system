import { ref, onMounted } from 'vue'

export const useScroll = () => {
  const scrollX = ref()
  const scrollY = ref()

  const getScroll = () => {
    scrollX.value = window.scrollX
    scrollY.value = window.scrollY
  }
  onMounted(() => {
    window.addEventListener('scroll', getScroll)
  })

  return {
    scrollX,
    scrollY
  }
}
