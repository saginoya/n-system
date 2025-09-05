import { fuseSearch } from '@/lib/fuseSearch'
import type { Exhibitors, Exhibitor } from '@/types'

export const searchByKeyword = (
  list: Exhibitors,
  keyword: string | undefined,
  keys: (keyof Exhibitor)[],
  threshold?: number,
) => {
  if (!keyword) return list
  return fuseSearch(list, keyword, { keys, threshold })
}
