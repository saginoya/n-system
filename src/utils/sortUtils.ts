export const useSort = () => {
  // オブジェクトの配列に対するソート
  // JSの組み込みオブジェクトsort()を利用しているため、アルゴリズムは実行エンジンごとに異なる。ブラウザごとに最適化されているため基本的にはこれを利用する
  const sortObjects = <T>(arr: T[], key: keyof T): T[] => {
    return arr.sort((a, b) => {
      return (a[key] ?? '') > (b[key] ?? '') ? 1 : -1
    })
  }

  // オブジェクトの配列にたいするマージソート
  const mergeSortObjects = <T>(arr: T[], key: keyof T): T[] => {
    // 配列の数が1以下の場合は早期リターン
    if (arr.length <= 1) {
      return arr
    }

    // ロジック
    const merge = (left: T[], right: T[]): T[] => {
      const results: T[] = []

      while (left.length && right.length) {
        if ((left[0][key] ?? '') < (right[0][key] ?? '')) {
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

  return {
    sortObjects,
    mergeSortObjects,
  }
}
