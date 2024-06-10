import type { Color } from '@/types/color'

export const useColorStyle = () => {
  const textColor = (color: Color) => {
    switch (color) {
      case 'primary':
        return 'text-primary'
      case 'secondary':
        return 'text-secondary'
      case 'accent':
        return 'text-accent'
      case 'exhibition-a':
        return 'text-exhibition-a'
      case 'exhibition-b':
        return 'text-exhibition-b'
      case 'info':
        return 'text-info'
      case 'success':
        return 'text-success'
      case 'error':
        return 'text-error'
      case 'warning':
        return 'text-warning'
      default:
        return 'text-white'
    }
  }

  const bgColor = (color: Color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary'
      case 'secondary':
        return 'bg-secondary'
      case 'accent':
        return 'bg-accent'
      case 'exhibition-a':
        return 'bg-exhibition-a'
      case 'exhibition-b':
        return 'bg-exhibition-b'
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
  }

  const borderColor = (color: Color) => {
    switch (color) {
      case 'primary':
        return 'border-primary'
      case 'secondary':
        return 'border-secondary'
      case 'accent':
        return 'border-accent'
      case 'exhibition-a':
        return 'border-exhibition-a'
      case 'exhibition-b':
        return 'border-exhibition-b'
      case 'info':
        return 'border-info'
      case 'success':
        return 'border-success'
      case 'error':
        return 'border-error'
      case 'warning':
        return 'border-warning'
      default:
        return 'border-white'
    }
  }

  return {
    textColor,
    bgColor,
    borderColor
  }
}
