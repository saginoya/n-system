import { fuseSearch } from '@/lib/fuseSearch'
import type { Exhibitors, Exhibitor } from '@/types'
import { convertFullWidthToHalfWidth, convertSymbolToHalfWidth } from '@/utils'

/**
 * キーワードをもとに出展社をフィルター・ソートする関数
 * @param list - 出展社リスト
 * @param keyword - 検索キーワード
 * @param keys - 出展社オブジェクト内の検索対象キー
 * @param threshold - あいまい検索のしきい値
 * @returns - ソート・フィルターを適用した出展社リスト
 */
export const searchByKeyword = (
  list: Exhibitors,
  keyword: string,
  keys: (keyof Exhibitor)[],
  threshold?: number,
) => {
  const convertedKeyword = convertSymbolToHalfWidth(convertFullWidthToHalfWidth(keyword))
  return fuseSearch(list, convertedKeyword as string, { keys, threshold })
}
