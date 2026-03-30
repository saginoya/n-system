/**
 * オブジェクトの配列に対するソート
 * JSの組み込みオブジェクトsort()を利用しているため、アルゴリズムは実行エンジンごとに異なる。ブラウザごとに最適化されているため基本的にはこれを利用する
 * 破壊的：元の配列を変更
 *
 * @param {T[]} arr - ソートしたいオブジェクトの配列
 * @param key - ソートの基準となるキー
 * @returns {T[]} ソート後の配列
 */
export const sortObjects = <T extends Record<string, unknown>>(arr: T[], key: keyof T): T[] => {
  if (arr.length === 0) return arr
  return arr.sort((a, b) => {
    const aValue = a[key] as number | string | undefined
    const bValue = b[key] as number | string | undefined
    if (aValue === undefined && bValue === undefined) return 0
    if (aValue === undefined) return 1
    if (bValue === undefined) return -1
    return aValue > bValue ? 1 : -1
  })
}
