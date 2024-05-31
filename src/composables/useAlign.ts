import { computed } from 'vue'

export const useAlign = (align: 'center' | undefined) => {
  const classJustifyContent = computed(() => {
    switch (align) {
      case 'center':
        return 'hp_justifyCenter'
      default:
        return undefined
    }
  })

  const classAlignItems = computed(() => {
    switch (align) {
      case 'center':
        return 'hp_itemsCenter'
      default:
        return undefined
    }
  })

  return {
    classJustifyContent,
    classAlignItems
  }
}
