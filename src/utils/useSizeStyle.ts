import type { Size } from '@/types/size'

export const useSizeStyle = () => {
  const widthSize = (size: Size) => {
    switch (size) {
      case 'free':
        return 'w-fit'
      case 'xs':
        return 'w-52'
      case 'sm':
        return 'w-64'
      case 'lg':
        return 'w-80'
      case 'xl':
        return 'w-96'
      default:
        return 'w-72'
    }
  }

  const heightSize = (size: Size) => {
    switch (size) {
      case 'free':
        return 'h-fit'
      case 'xs':
        return 'h-10'
      case 'sm':
        return 'h-12'
      case 'lg':
        return 'h-16'
      case 'xl':
        return 'h-20'
      default:
        return 'h-14'
    }
  }

  return {
    widthSize,
    heightSize
  }
}
