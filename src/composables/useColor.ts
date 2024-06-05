import { computed } from 'vue'
import type { Color } from '@/types/color'

// type Variant = 'outlined' | undefined

export const useColor = (color: Color) => {
  //  const background = ref()
  //  const border = ref()

  /*   const classColor = computed(() => {
    if (variant === 'outlined') {
      text.value = getColor()
      background.value = 'hp_bgColor_white'
      border.value = getBorderColor()
    } else if (name === 'none') {
      text.value = 'hp_color_fontDefualt'
      background.value = getBgColor()
      border.value = getBorderColor()
    } else {
      text.value = 'hp_color_white'
      background.value = getBgColor()
      border.value = getBorderColor()
    }
    return [text.value, background.value, border.value]
  }) */

  const textColor = computed(() => {
    return 'text-' + String(color)
  })

  const bgColor = computed<string>(() => {
    switch (color) {
      case 'primary':
        return 'bg-primary'
      case 'secondary':
        return 'bg-secondary'
      case 'accent':
        return 'bg-accent'
      case 'exhibition-a':
        return 'exhibition-a'
      case 'exhibition-b':
        return 'exhibition-b'
      case 'info':
        return 'bg-info'
      case 'success':
        return 'bg-success'
      case 'error':
        return 'bg-error'
      case 'warning':
        return 'bg-warning'
      default:
        return 'bg-white'
    }
  })

  return {
    textColor,
    bgColor
  }
}
