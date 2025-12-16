import { ref } from 'vue'

import type { SortType, Lang } from '@/types'
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

  type SortLabel = Record<Lang, Record<SortType, string>>

  // ソートボタンのラベル
  const sortLabel: SortLabel = {
    ja: { order: '50音順', koma: '小間番号順', search: '関連順' },
    en: { order: 'Name', koma: 'Booth number', search: 'Related' },
  }

  return {
    stateSort,
    updateStateSort,
    updateSortToOrder,
    updateSortToKoma,
    sortLabel,
  }
}
