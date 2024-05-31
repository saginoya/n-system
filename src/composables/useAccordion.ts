import { ref, readonly } from 'vue'

export const useAccordion = () => {
  const visible = ref(false)
  const inversion = () => (visible.value = !visible.value)

  return {
    visible: readonly(visible),
    inversion
  }
}
