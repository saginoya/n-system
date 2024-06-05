import { ref, readonly } from 'vue'

export const useDrawer = () => {
  const drawer = ref<boolean>(false)
  const operateDrawer = (): void => {
    drawer.value = !drawer.value
  }

  return {
    drawer: readonly(drawer),
    operateDrawer
  }
}
