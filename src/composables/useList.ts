import { computed } from 'vue'

export const useList = (outline = false, heightLimit = false) => {
  const classObject = computed(() => ({
    bl_listOutline: outline,
    bl_listHeightLimit: heightLimit
  }))

  return {
    classObject
  }
}
