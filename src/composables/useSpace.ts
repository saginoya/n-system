import { computed } from 'vue'

export const useSpace = (number?: 1 | 2 | 3 | 4 | 5 | 6, unit?: 'em' | 'px') => {
  const classGap = computed(() => {
    if (unit === 'em') {
      return classGapEm()
    } else {
      return classGapPx()
    }
  })
  const classGapPx = () => {
    switch (number) {
      case 1:
        return 'hp_gap1'
      case 2:
        return 'hp_gap2'
      case 3:
        return 'hp_gap3'
      case 4:
        return 'hp_gap4'
      case 5:
        return 'hp_gap5'
      case 6:
        return 'hp_gap6'
      default:
        return 'hp_gap1'
    }
  }
  const classGapEm = () => {
    switch (number) {
      case 1:
        return 'hp_gap1em'
      case 2:
        return 'hp_gap2em'
      case 3:
        return 'hp_gap3em'
      case 4:
        return 'hp_gap4em'
      case 5:
        return 'hp_gap5em'
      case 6:
        return 'hp_gap6em'
      default:
        return 'hp_gap1em'
    }
  }

  return {
    classGap
  }
}
