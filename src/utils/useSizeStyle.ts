import type { Size } from '@/types/size'

export const useSizeStyle = () => {
  const widthSize = (size: Size) => {
    switch (size) {
      case 'xs':
        return 'w-52'
      case 'sm':
        return 'w-64'
      case 'lg':
        return 'w-80'
      case 'xl':
        return 'w-96'
      case 'free':
        return 'w-fit'
      case 'w-full':
        return 'w-full'
      default:
        return 'w-72'
    }
  }

  const heightSize = (size: Size) => {
    switch (size) {
      case 'xs':
        return 'h-14'
      case 'sm':
        return 'h-16'
      case 'lg':
        return 'h-20'
      case 'xl':
        return 'h-24'
      case 'free':
        return 'h-fit'
      default:
        return 'h-20'
    }
  }

  return {
    widthSize,
    heightSize
  }
}
