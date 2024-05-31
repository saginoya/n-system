import { ref, computed, readonly } from 'vue'
import type { Color } from '@/types/color'

export const useColor = (name: Color, variant: 'outlined' | undefined) => {
  const text = ref()
  const background = ref()
  const border = ref()

  const classColor = computed(() => {
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
  })

  const getColor = () => {
    switch (name) {
      case 'none':
        return 'hp_color__none'
      case 'primary':
        return 'hp_color_primary'
      case 'secondary':
        return 'hp_color_secondary'
      case 'nexpo':
        return 'hp_color_nexpo'
      case 'gwpe':
        return 'hp_color_gwpe'
      case 'accent':
        return 'hp_color_accent'
      case 'info':
        return 'hp_color_info'
      case 'success':
        return 'hp_color_success'
      case 'error':
        return 'hp_color_error'
      case 'warning':
        return 'hp_color_warning'
      case 'line':
        return 'hp_color_line'
      case 'facebook':
        return 'hp_color_facebook'
      case 'gray':
        return 'hp_color_gray'
      default:
        return 'hp_color_gray'
    }
  }
  const getBgColor = () => {
    switch (name) {
      case 'none':
        return 'hp_bgColor_none'
      case 'primary':
        return 'hp_bgColor_primary'
      case 'secondary':
        return 'hp_bgColor_secondary'
      case 'nexpo':
        return 'hp_bgColor_nexpo'
      case 'gwpe':
        return 'hp_bgColor_gwpe'
      case 'accent':
        return 'hp_bgColor_accent'
      case 'info':
        return 'hp_bgColor_info'
      case 'success':
        return 'hp_bgColor_success'
      case 'error':
        return 'hp_bgColor_error'
      case 'warning':
        return 'hp_bgColor_warning'
      case 'line':
        return 'hp_bgColor_line'
      case 'facebook':
        return 'hp_bgColor_facebook'
      case 'gray':
        return 'hp_bgColor_gray'
      default:
        return 'hp_bgColor_gray'
    }
  }

  const getBorderColor = () => {
    switch (name) {
      case 'none':
        return 'hp_borderColor_none'
      case 'primary':
        return 'hp_borderColor_primary'
      case 'secondary':
        return 'hp_borderColor_secondary'
      case 'nexpo':
        return 'hp_borderColor_nexpo'
      case 'gwpe':
        return 'hp_borderColor_gwpe'
      case 'accent':
        return 'hp_borderColor_accent'
      case 'info':
        return 'hp_borderColor_info'
      case 'success':
        return 'hp_borderColor_success'
      case 'error':
        return 'hp_borderColor_error'
      case 'warning':
        return 'hp_borderColor_warning'
      case 'line':
        return 'hp_borderColor_line'
      case 'facebook':
        return 'hp_borderColor_facebook'
      case 'gray':
        return 'hp_borderColor_gray'
      default:
        return 'hp_borderColor_gray'
    }
  }

  return {
    classColor: readonly(classColor)
  }
}
