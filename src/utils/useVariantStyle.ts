import { useColorStyle } from '@/utils/useColorStyle'
import type { Color } from '@/types/color'
import type { Variant } from '@/types/variant'

export const useVariantStyle = () => {
  const { textColor, bgColor, borderColor } = useColorStyle()
  const getStyles = (color: Color, variant?: Variant): string[] => {
    const text: string = textColor(color)
    const bg: string = bgColor(color)
    const border: string = borderColor(color)

    const textWhite: string = 'text-white'
    const bgWhite: string = 'bg-white'
    const borderWhite: string = 'border-white'

    switch (variant) {
      case 'outlined':
        return [text, bgWhite, border]
      case 'text':
        return [text, bgWhite, borderWhite]
      default:
        return [textWhite, bg, border]
    }
  }

  return {
    getStyles
  }
}
