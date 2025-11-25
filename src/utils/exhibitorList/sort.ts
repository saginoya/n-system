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

  // Helper: detect starting script of a string
  const isJapaneseStart = (s: string) => /^[\u3040-\u30FF\u4E00-\u9FFF]/u.test(s)
  const isLatinStart = (s: string) => /^[A-Za-z]/.test(s)

  const scriptRank = (s: string) => {
    if (isJapaneseStart(s)) return 0 // Japanese (あいうえお etc.) -> highest priority
    if (isLatinStart(s)) return 2 // Latin (ABC) -> lowest priority
    return 1 // Others (numbers, symbols, etc.) -> middle
  }

  return [...list].sort((a, b) => {
    const aValue = a[sortKey as keyof typeof a]
    const bValue = b[sortKey as keyof typeof b]

    if (aValue === undefined && bValue === undefined) return 0
    if (aValue === undefined) return 1
    if (bValue === undefined) return -1

    // Numeric comparison when both are numbers
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue
    }

    // Convert to strings for script-based ordering
    const aStr = String(aValue)
    const bStr = String(bValue)

    const rankA = scriptRank(aStr)
    const rankB = scriptRank(bStr)

    // If scripts differ (e.g. Japanese vs Latin), use the predefined order
    if (rankA !== rankB) return rankA - rankB

    // Same script or both "other": use locale-aware comparison (Japanese locale)
    // sensitivity: 'base' to ignore case differences, numeric: true to handle numeric substrings
    return aStr.localeCompare(bStr, 'ja', { sensitivity: 'base', numeric: true })
  })
}
