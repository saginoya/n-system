import { ref } from 'vue'

import type { SortType } from '@/types'

/**
 * ソートの条件を管理するComposable
 */
export const useStateSort = () => {
  const stateSort = ref<SortType>('order')

  // ソートの更新関数
  const updateStateSort = (value: SortType): void => {
    stateSort.value = value
  }
  const updateSortToOrder = () => {
    stateSort.value = 'order'
  }
  const updateSortToKoma = () => {
    stateSort.value = 'koma'
  }

  return {
    stateSort,
    updateStateSort,
    updateSortToOrder,
    updateSortToKoma,
  }
}
