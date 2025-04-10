import type { Color } from '@/types'

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
      case 'white':
        return 'text-white'
      case 'gray':
        return 'text-gray-500'
      case 'orange':
        return 'text-orange-500'
      case 'yellow':
        return 'text-yellow-500'
      case 'green':
        return 'text-green-500'
      case 'blue':
        return 'text-blue-500'
      case 'gray-light':
        return 'text-gray-300'
      case 'orange-light':
        return 'text-orange-400'
      case 'yellow-light':
        return 'text-yellow-400'
      case 'green-light':
        return 'text-green-400'
      case 'blue-light':
        return 'text-blue-400'
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
      case 'white':
        return 'bg-white'
      case 'gray':
        return 'bg-gray-500'
      case 'orange':
        return 'bg-orange-500'
      case 'yellow':
        return 'bg-yellow-500'
      case 'green':
        return 'bg-green-500'
      case 'blue':
        return 'bg-blue-500'
      case 'gray-light':
        return 'bg-gray-300'
      case 'orange-light':
        return 'bg-orange-400'
      case 'yellow-light':
        return 'bg-yellow-400'
      case 'green-light':
        return 'bg-green-400'
      case 'blue-light':
        return 'bg-blue-400'
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
      case 'white':
        return 'border-white'
      case 'gray':
        return 'border-gray-500'
      case 'orange':
        return 'border-orange-500'
      case 'yellow':
        return 'border-yellow-500'
      case 'green':
        return 'border-green-500'
      case 'blue':
        return 'border-blue-500'
      case 'gray-light':
        return 'border-gray-300'
      case 'orange-light':
        return 'border-orange-400'
      case 'yellow-light':
        return 'border-yellow-400'
      case 'green-light':
        return 'border-green-400'
      case 'blue-light':
        return 'border-blue-400'
      default:
        return 'border-white'
    }
  }

  return {
    textColor,
    bgColor,
    borderColor,
  }
}
