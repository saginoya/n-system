import { cn } from '@/lib/cn'
import { textColorMap, bgColorMap, borderColorMap } from '@/styles'
import type { Color } from '@/types'

export const variantFlatConcept = (color: Color): string => {
  return cn(
    color !== 'white' ? textColorMap['white'] : 'text-inherit',
    bgColorMap[color],
    borderColorMap[color],
  )
}

export const variantOutlinedConcept = (color: Color): string => {
  return cn(
    color !== 'white' ? textColorMap[color] : 'text-inherit',
    bgColorMap['white'],
    borderColorMap[color],
  )
}

export const variantTextConcept = (color: Color): string => {
  return cn(
    color !== 'white' ? textColorMap[color] : 'text-inherit',
    bgColorMap['white'],
    borderColorMap['white'],
  )
}

export const variantConceptMap = {
  flat: variantFlatConcept,
  outlined: variantOutlinedConcept,
  text: variantTextConcept,
}

export type Variant = keyof typeof variantConceptMap
