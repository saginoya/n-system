export const useCommaSeparatedValues = () => {
  // 文字列の配列をコンマ区切りの文字列へ変換
  const toCommaSeparated = (array: string[]): string => {
    return array.join(',')
  }

  // コンマ区切りの文字列を配列へ変換
  const toStringArray = (value: string | undefined): string[] => {
    if (!value) return []
    return value
      .split(',')
      .map((str) => str.trim())
      .filter((str) => str !== '')
  }

  return {
    toCommaSeparated,
    toStringArray
  }
}
