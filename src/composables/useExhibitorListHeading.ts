import { computed, type Ref } from 'vue'

import type { SortType, Exhibitors } from '@/types'
import { generateHeading } from '@/utils/exhibitorList'

type Heading = string | undefined

/**
 * 出展社一覧から小見出しを生成するロジック（リアクティブ）
 * @param exhibitorList
 * @param sort
 * @param lang
 * @returns { headings, getHeading, showHeading }
 */
export const useExhibitorListHeading = (exhibitorList: Ref<Exhibitors>, sort: Ref<SortType>) => {
  // 出展社一覧から小見出しの一覧リスト生成
  const headings = computed<Heading[]>(() => {
    return exhibitorList.value.map((item) =>
      generateHeading(sort.value, item.order, item.genreName ?? ''),
    )
  })

  // 小見出しリストから番号で値を取得
  const getHeading = (num: number): Heading => headings.value[num]

  // 小見出しの表示・非表示を判定する（前の値と異なっていることが条件）
  const showHeading = (num: number): boolean => {
    return headings.value[num] !== headings.value[num - 1]
  }

  return { headings, getHeading, showHeading }
}
