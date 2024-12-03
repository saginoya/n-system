import { ref, computed } from 'vue'

/**
 * バリデーションの結果を集計する関数
 * @returns addValidatedResults - バリデーションの結果を追加する関数
 * @returns isValidated - バリデーションの結果がすべてTrueかの判定
 */
export const useValidatedResults = () => {
  // バリデーションの結果を保管する
  const validatedResults = ref<{ [key: string]: boolean }>({})

  // validatedResultsにバリデーション結果を追加する関数
  const addValidatedResults = (key: string, result: boolean): void => {
    validatedResults.value[key] = result
  }

  // validatedResultsのすべてがTRUEかの判定
  const isValidated = computed<boolean>(() => {
    return Object.values(validatedResults.value).every((value) => value === true)
  })

  return {
    addValidatedResults,
    isValidated
  }
}
