import { ref, readonly } from 'vue'

export const useDrawer = () => {
  const drawer = ref<boolean>(false)
  const operateDrawer = (): void => {
    drawer.value = !drawer.value
  }
  const dismissDrawer = () => (drawer.value = false)

  return {
    drawer: readonly(drawer),
    operateDrawer,
    dismissDrawer
  }
}
