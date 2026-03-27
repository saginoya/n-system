import { ref, computed } from 'vue'

import type { OverseasType } from '@/types'

const allValue: OverseasType[] = ['overseas', 'domestic']
const defaultSet = new Set(allValue)

/**
 * 海外・国内のフィルター条件を管理するComposable
 */
export const useStateOverseas = () => {
  const stateOverseas = ref<Set<OverseasType>>(defaultSet)

  // 海外・国内両方が表示される状態か
  const isAllStateOverseas = computed<boolean>(() => {
    return (
      stateOverseas.value.size === defaultSet.size &&
      allValue.every((v) => stateOverseas.value.has(v))
    )
  })

  // 海外が表示される状態か
  const isOverseasActive = computed<boolean>(() => {
    return stateOverseas.value.has('overseas')
  })

  // 国内が表示される状態か
  const isDomesticActive = computed<boolean>(() => {
    return stateOverseas.value.has('domestic')
  })

  // 海外・国内を追加する
  const addStateOverseas = (value: OverseasType): void => {
    stateOverseas.value = new Set(stateOverseas.value).add(value)
  }

  // 海外・国内を削除する
  const removeStateOverseas = (value: OverseasType): void => {
    const next = new Set(stateOverseas.value)
    next.delete(value)
    stateOverseas.value = next
  }

  // 海外・国内の値をリセット
  const clearStateOverseas = (): void => {
    stateOverseas.value = new Set(defaultSet)
  }

  return {
    stateOverseas,
    isAllStateOverseas,
    isOverseasActive,
    isDomesticActive,
    addStateOverseas,
    removeStateOverseas,
    clearStateOverseas,
  }
}
