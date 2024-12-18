export const useGenericList = <T>(initList?: T[]) => {
  const genericList = new Set(initList)

  // 文字列を追加する関数
  const addValue = (value: T): void => {
    genericList.add(value)
  }

  // 指定した値を削除する関数
  const removeValue = (value: T): void => {
    genericList.delete(value)
  }

  return {
    genericList,
    addValue,
    removeValue
  }
}
