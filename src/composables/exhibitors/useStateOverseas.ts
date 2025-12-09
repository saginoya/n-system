import { ref } from 'vue'

/**
 * 海外・国内のフィルター条件を管理するComposable
 */
export const useStateOverseas = () => {
  const stateOverseas = ref<boolean | undefined>(undefined)

  // 海外・国内の更新関数
  const updateStateOverseas = (value: boolean | undefined): void => {
    stateOverseas.value = value
  }
  // 海外・国内の更新関数（削除）
  const removeStateOverseas = (): void => {
    stateOverseas.value = undefined
  }

  return {
    stateOverseas,
    updateStateOverseas,
    removeStateOverseas,
  }
}
