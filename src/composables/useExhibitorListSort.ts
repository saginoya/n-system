import { ref, computed, watchEffect } from 'vue'
import { useSort } from '@/utils'
import type { Ref } from 'vue'
import type { Exhibitor, SortType } from '@/types'

export const useExhibitorListSort = (exhibitorList: Ref<Exhibitor[]>) => {
  // ソートの条件
  const stateSort = ref<SortType>('name')

  // ソートの条件からソートのキー名を返す
  const stateSortKey = computed(() => {
    return sortKeys[stateSort.value]
  })
  // ソートの条件とオブジェクトのキーの相関
  const sortKeys: Record<SortType, keyof Exhibitor> = {
    name: 'order',
    koma: 'koma',
  }

  // ソートの関数読み込み
  const { sortObjects } = useSort()

  // リストをソートする関数
  const sortExhibitorList = () => {
    if (!stateSort.value || exhibitorList.value.length < 2) return
    exhibitorList.value = sortObjects<Exhibitor>(exhibitorList.value, stateSortKey.value)
  }

  // ソートの条件が変更されたら配列をソートする
  watchEffect(() => {
    sortExhibitorList()
  })

  return {
    stateSort,
  }
}
