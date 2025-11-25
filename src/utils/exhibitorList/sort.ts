import type { Exhibitors, SortType } from '@/types'

/**
 * 出展社リストをソートキーで並べ替える
 * @param list - 出展社リスト
 * @param sortKey - ソートキー ('order' | 'koma' | 'search')
 * @returns ソート済みの出展社リスト
 * @throws {Error} 無効なソートキーが渡された場合
 */
export const sortExhibitorList = (list: Exhibitors, sortKey: SortType) => {
  // searchは検索結果の一致順なので追加ソート不要
  if (sortKey === 'search') return list

  // ソートキーが全アイテムに存在することを確認
  const validSortKey = ['order', 'koma']
  if (!validSortKey.includes(sortKey)) {
    throw new Error(`Invalid sort key: ${sortKey}. Expected 'order' or 'koma'`)
  }

  if (!list.every((item) => sortKey in item)) {
    throw new Error(`Sort key '${sortKey}' not found in all items`)
  }

  return [...list].sort((a, b) => {
    const aValue = a[sortKey as keyof typeof a]
    const bValue = b[sortKey as keyof typeof b]

    if (aValue === undefined && bValue === undefined) return 0
    if (aValue === undefined) return 1
    if (bValue === undefined) return -1

    if (aValue < bValue) return -1
    if (aValue > bValue) return 1
    return 0
  })
}

