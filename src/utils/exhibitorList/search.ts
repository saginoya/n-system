import { fuseSearch } from '@/lib/fuseSearch'
import type { Exhibitors, Exhibitor } from '@/types'
import { convertFullWidthToHalfWidth, convertSymbolToHalfWidth } from '@/utils'

export const searchByKeyword = (
  list: Exhibitors,
  keyword: string | undefined,
  keys: (keyof Exhibitor)[],
  threshold?: number,
) => {
  if (!keyword) return list
  const convertedKeyword = convertSymbolToHalfWidth(convertFullWidthToHalfWidth(keyword))
  return fuseSearch(list, convertedKeyword as string, { keys, threshold })
}
