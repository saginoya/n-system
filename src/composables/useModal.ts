import { ref, readonly } from 'vue'

export const useModal = (initValue?: boolean) => {
  const visible = ref(initValue || false)
  const show = () => (visible.value = true)
  const dismiss = () => (visible.value = false)

  return {
    visible: readonly(visible),
    show,
    dismiss,
  }
}
