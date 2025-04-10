import { useColorStyle } from '@/styles'
import type { Color } from '@/types/color'
import type { Variant } from '@/types/variant'

export const useVariantStyle = () => {
  const { textColor, bgColor, borderColor } = useColorStyle()
  const getStyles = (color: Color, variant?: Variant): string[] => {
    const text: string = textColor(color)
    const bg: string = bgColor(color)
    const border: string = borderColor(color)

    const textWhite: string = textColor('white')
    const bgWhite: string = bgColor('white')
    const borderWhite: string = borderColor('white')

    switch (variant) {
      case 'outlined':
        return [text, bgWhite, border]
      case 'text':
        return [text, bgWhite, borderWhite]
      default:
        return [textWhite, bg, border]
    }
  }

  const getCardStyles = (color: Color, variant?: Variant): string[] => {
    const bg: string = bgColor(color)
    const border: string = borderColor(color)

    const textWhite: string = textColor('white')
    const bgWhite: string = bgColor('white')
    const borderWhite: string = borderColor('white')

    switch (variant) {
      case 'flat':
        return [textWhite, bg, border]
      case 'outlined':
        return [bgWhite, border]
      case 'text':
        return [bgWhite, borderWhite]
      default:
        return [bgWhite, borderWhite]
    }
  }

  return {
    getStyles,
    getCardStyles,
  }
}
