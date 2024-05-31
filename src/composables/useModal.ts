import { ref, readonly } from 'vue'

export const useModal = () => {
  const visible = ref(false)
  const show = () => (visible.value = true)
  const dismiss = () => (visible.value = false)

  return {
    visible: readonly(visible),
    show,
    dismiss
  }
}
