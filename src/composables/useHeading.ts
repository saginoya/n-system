import { computed } from 'vue'

export const useHeading = (center = false, outline = false) => {
  const classObject = computed(() => ({
    hp_textCenter: center,
    el_headerOutline: outline
  }))

  return {
    classObject
  }
}
