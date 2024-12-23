import { ref, type Ref, type ModelRef } from 'vue'

/**
 * useValueListの補助関数
 * valueListの初期化を行う
 * @param initList
 * @returns
 */
export const createValueList = (initList: string[] = []) => ref([...initList])

/**
 * 値を格納した配列を操作する関数
 * @param valueList
 * @returns addValue 配列に値を追加するメソッド
 * @returns removeValue 配列から値を削除するメソッド
 */
export const useValueList = (valueList: Ref<string[]> | ModelRef<string[]>) => {
  const hasValue = (value: string): boolean => {
    return valueList.value.includes(value)
  }

  const addValue = (value: string): void => {
    if (!hasValue(value)) {
      valueList.value.push(value)
    }
  }

  const removeValue = (value: string): void => {
    valueList.value = valueList.value.filter((item) => item !== value)
  }

  return {
    hasValue,
    addValue,
    removeValue
  }
}
