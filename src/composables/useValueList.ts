import { ref } from 'vue'

export const useValueList = (initValue?: string[]) => {
  const valueList = ref<string[]>(initValue || [])

  // 文字列を追加する関数
  const addValue = (value: string): void => {
    if (!valueList.value.includes(value)) {
      valueList.value.push(value)
    }
  }

  // 指定した値を削除する関数
  const removeValue = (value: string): void => {
    const index = valueList.value.indexOf(value)
    if (index !== -1) {
      valueList.value.splice(index, 1) // 一致する値を削除
    }
  }

  return {
    valueList,
    addValue,
    removeValue
  }
}
