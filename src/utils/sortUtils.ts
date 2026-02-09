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

/**
 * オブジェクトの配列に対するマージソート
 * マージソートは安定したソートアルゴリズムで、最悪の場合でもO(n log n)の時間複雑度を持つ
 * 非破壊的：新しい配列を返す
 *
 * @param {T[]} arr - ソートしたいオブジェクトの配列
 * @param key - ソートの基準となるキー
 * @returns {T[]} ソート後の配列
 */
export const mergeSortObjects = <T extends Record<string, unknown>>(
  arr: T[],
  key: keyof T,
): T[] => {
  // 配列の数が1以下の場合は早期リターン
  if (arr.length <= 1) {
    return arr
  }

  // ロジック
  const merge = (left: T[], right: T[]): T[] => {
    const results: T[] = []

    while (left.length && right.length) {
      const leftValue = left[0]![key] as number | string | undefined
      const rightValue = right[0]![key] as number | string | undefined

      if (leftValue === undefined) {
        results.push(right.shift()!)
      } else if (rightValue === undefined) {
        results.push(left.shift()!)
      } else if (leftValue < rightValue) {
        results.push(left.shift()!)
      } else {
        results.push(right.shift()!)
      }
    }

    return [...results, ...left, ...right]
  }

  const center = Math.floor(arr.length / 2)
  const left = arr.slice(0, center)
  const right = arr.slice(center)

  return merge(mergeSortObjects(left, key), mergeSortObjects(right, key))
}
