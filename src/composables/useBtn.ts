import { computed, readonly } from 'vue'
import type { Color } from '@/types/color'

export const useBtn = (type: 'submit' | 'reset' | 'button' | undefined, color: Color) => {
  const btnType = computed(() => {
    switch (type) {
      case 'submit':
        return 'submit'
      case 'reset':
        return 'reset'
      default:
        return 'button'
    }
  })
  const classBtnColor = computed(() => {
    switch (color) {
      case 'primary':
        return 'el_btnPrimary'
      case 'nexpo':
        return 'el_btnNexpo'
      case 'gwpe':
        return 'el_btnGwpe'
      case 'accent':
        return 'el_btnAccent'
      case 'info':
        return 'el_btnInfo'
      case 'success':
        return 'el_btnSuccess'
      case 'error':
        return 'el_btnError'
      case 'warning':
        return 'el_btnWarning'
      case 'gray':
        return 'el_btnGray'
      case 'none':
        return 'el_btnNone'
      default:
        return 'el_btnPrimary'
    }
  })

  return {
    btnType: readonly(btnType),
    classBtnColor: readonly(classBtnColor)
  }
}
