export const useConvertType = () => {
  /**
   * 文字列の配列をコンマ区切りの文字列へ変換
   * @param array
   * @returns string
   */
  const convertArrayToCommaSeparated = (array: string[]): string => {
    return array.join(',')
  }

  /**
   * コンマ区切りの文字列を配列へ変換
   * @param value
   * @returns
   */
  const convertCommaSeparatedToArray = (value: string | undefined): string[] => {
    if (!value) return []
    return value
      .split(',')
      .map((str) => str.trim())
      .filter((str) => str !== '')
  }

  return {
    convertArrayToCommaSeparated,
    convertCommaSeparatedToArray,
  }
}
