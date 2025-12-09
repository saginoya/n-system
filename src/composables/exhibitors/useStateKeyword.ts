import { ref } from 'vue'

/**
 * キーワードの状態管理を行うComposable
 */
export const useStateKeyword = () => {
  const stateKeyword = ref<string>('')

  // キーワードの更新関数
  const updateStateKeyword = (value: string): void => {
    stateKeyword.value = value
  }
  // キーワードの更新関数（削除）
  const removeStateKeyword = (): void => {
    stateKeyword.value = ''
  }

  return {
    stateKeyword,
    updateStateKeyword,
    removeStateKeyword,
  }
}
