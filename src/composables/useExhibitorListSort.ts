import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Exhibitor, SortType } from '@/types/exhibitorList'

export const useExhibitorListSort = (exhibitorList: Ref<Exhibitor[]>) => {
  // ソートの条件
  const stateSort = ref<SortType>()

  // ソートの条件を更新してソートを実行する関数
  const setStateSort = (type: SortType) => {
    stateSort.value = type
    replaceList()
  }

  // JSONの出展社リストをソートする関数
  const replaceList = () => {
    exhibitorList.value.sort((a, b) => {
      if (stateSort.value === 'name') {
        return a.order > b.order ? 1 : -1
      } else {
        return a.koma > b.koma ? 1 : -1
      }
    })
  }

  return {
    stateSort,
    setStateSort,
    replaceList
  }
}
