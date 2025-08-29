import { computed } from 'vue'

import type { Exhibitor, Favorites } from '@/types'
import {
  filterByFavorites,
  filterByGenres,
  searchByKeyword,
  sortExhibitorList,
} from '@/utils/exhibitorList'

type ExhibitorItem = keyof Exhibitor

const searchWithinKeys: ExhibitorItem[] = ['name', 'koma', 'subName', 'contents'] as const

export const useExhibitorList = (
  rawExhibitorList: Exhibitor[],
  favorites: Favorites,
  keyword: string,
  genres: string[],
  sort: ExhibitorItem,
) => {
  const exhibitorList = computed(() => {
    let list = rawExhibitorList

    // フィルタリング
    list = filterByFavorites(list, favorites)
    list = filterByGenres(list, genres)

    // 検索
    list = searchByKeyword(list, keyword, searchWithinKeys)

    // ソート
    list = sortExhibitorList(list, sort)

    return list
  })

  // 件数
  const numExhibitorList = computed(() => exhibitorList.value.length)

  return {
    exhibitorList,
    numExhibitorList,
  }
}
