import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { Exhibitor, SortType } from '@/types/exhibitorList'

export const useExhibitorListSort = (exhibitorList: Ref<Exhibitor[]>) => {
  // ソートの条件
  const stateSort = ref<SortType>('name')

  // ソートの条件と出展社のオブジェクトの相対関係
  const sortKeys: Record<SortType, keyof Exhibitor> = {
    name: 'order',
    koma: 'koma'
  }

  // リストをソートする関数
  const sortExhibitorList = () => {
    if (!stateSort.value) return
    const key = sortKeys[stateSort.value]
    exhibitorList.value.sort((a, b) => {
      return (a[key] ?? 0) > (b[key] ?? 0) ? 1 : -1
    })
  }

  // ソートの条件が変更されたら配列をソートする
  watchEffect(() => {
    sortExhibitorList()
  })

  return {
    stateSort
  }
}
