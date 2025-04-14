import type { Size } from '@/types'

export const widthSizeMap: Record<Size, string> = {
  xs: 'w-52',
  sm: 'w-64',
  md: 'w-72',
  lg: 'w-80',
  xl: 'w-96',
  free: 'w-fit',
  'w-full': 'w-full',
}

export const heightSizeMap: Record<Size, string> = {
  xs: 'h-14',
  sm: 'h-16',
  md: 'h-20',
  lg: 'h-20',
  xl: 'h-24',
  free: 'h-fit',
  'w-full': 'h-20',
}
