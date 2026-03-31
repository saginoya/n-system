/**
 * オブジェクトの配列に対するソート（非破壊）
 *
 * - 非破壊：元の配列は変更せず、新しい配列を返す
 * - key の値が undefined の要素は末尾に配置される（昇順/降順どちらでも末尾固定）
 * - 比較関数は同値のとき 0 を返し、契約を満たす
 * - key の値は「number（またはundefined）」か「string（またはundefined）」を想定し、
 *   number と string の混在は想定しない
 *
 * @param arr - ソートしたいオブジェクトの配列
 * @param key - ソートの基準となるキー
 * @param order - ソート順（'asc': 昇順, 'desc': 降順）
 * @returns ソート後の新しい配列
 */
export const sortObjects = <T extends Record<PropertyKey, unknown>, K extends keyof T>(
  arr: readonly T[],
  key: K,
  order: 'asc' | 'desc' = 'asc',
): T[] => {
  const dir = order === 'asc' ? 1 : -1

  // 非破壊にするためコピーしてから sort する
  return arr.slice().sort((a, b) => {
    const aValue = a[key] as number | string | undefined
    const bValue = b[key] as number | string | undefined

    // undefined は常に末尾へ
    if (aValue === undefined && bValue === undefined) return 0
    if (aValue === undefined) return 1
    if (bValue === undefined) return -1

    // 同値は 0（比較関数の契約）
    if (aValue === bValue) return 0

    // 昇順/降順の切り替え
    // （number と string が混在しない前提）
    return (aValue > bValue ? 1 : -1) * dir
  })
}
