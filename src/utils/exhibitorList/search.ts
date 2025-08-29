import { fuseSearch } from '@/lib/fuseSearch'
import type { Exhibitor } from '@/types'

export const searchByKeyword = (
  list: Exhibitor[],
  keyword: string,
  keys: (keyof Exhibitor)[],
  threshold?: number,
) => {
  return fuseSearch(list, keyword, { keys, threshold })
}
