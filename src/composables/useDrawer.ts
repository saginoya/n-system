import { ref, readonly } from 'vue'

export const useDrawer = () => {
  const drawer = ref(false)
  const operateDrawer = () => {
    drawer.value = !drawer.value
  }

  return {
    drawer: readonly(drawer),
    operateDrawer
  }
}
