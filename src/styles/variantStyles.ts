import { textColorMap, bgColorMap, borderColorMap } from '@/styles'
import type { Color, Variant } from '@/types'

export const useVariantStyle = () => {
  const getStyles = (color: Color, variant?: Variant): string[] => {
    const text: string = textColorMap[color]
    const bg: string = bgColorMap[color]
    const border: string = borderColorMap[color]

    const textWhite: string = textColorMap['white']
    const bgWhite: string = bgColorMap['white']
    const borderWhite: string = borderColorMap['white']

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
    const bg: string = bgColorMap[color]
    const border: string = borderColorMap[color]

    const textWhite: string = textColorMap['white']
    const bgWhite: string = bgColorMap['white']
    const borderWhite: string = borderColorMap['white']

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
