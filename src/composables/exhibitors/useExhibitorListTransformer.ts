import { computed, unref, type MaybeRef } from 'vue'

import type { Exhibitors, SortType, GenreID, Favorites, ExhibitorSearchKey } from '@/types'
import { EXHIBITOR_SEARCH_KEYS } from '@/types'
import {
  countExhibitors,
  filterByFavorites,
  filterByGenres,
  filterByOverseas,
  searchByKeyword,
  sortExhibitorList,
} from '@/utils/exhibitorList'

// ReadonlyなRef型を定義
type ReadonlyRef<T> = {
  readonly value: T
}

// 検索条件はリアクティブとしても非リアクティブとしても受け取れるようにする
type Options = {
  favorite: MaybeRef<boolean>
  myFavorites: MaybeRef<Favorites>
  genres: MaybeRef<GenreID[]>
  overseas: MaybeRef<boolean | undefined>
  keyword: MaybeRef<string | undefined>
  sort: MaybeRef<SortType>
}

// キーワード検索の対象となるプロパティキーのリスト
const searchWithinKeys: ExhibitorSearchKey[] = EXHIBITOR_SEARCH_KEYS

export const useExhibitorListTransformer = (rawData: ReadonlyRef<Exhibitors>, options: Options) => {
  // フィルターやソートを適用した出展社リスト
  const exhibitorList = computed<Exhibitors>(() => {
    return getFilteredExhibitorList(rawData.value)
  })

  // フィルターやソートを適用した出展社リスト件数
  const numExhibitorList = computed(() => countExhibitors(exhibitorList.value))

  const favorite = computed(() => unref(options.favorite))
  const myFavorites = computed(() => unref(options.myFavorites))
  const genres = computed(() => unref(options.genres))
  const overseas = computed(() => unref(options.overseas))
  const keyword = computed(() => unref(options.keyword))
  const sort = computed(() => unref(options.sort))

  /**
   * Rawリストをフィルターやソートして結果リストを返す
   *
   * フィルター適用の順序（重要）:
   * 1. お気に入り (最も選別率が高い)
   * 2. ジャンル（細分化）
   * 3. 海外/国内（細分化）
   * 4. キーワード検索（最後に適用。検索結果の一致度を保つため）
   * 5. ソート（並べ替え）
   *
   * @param list - 対象となる出展社リスト
   * @returns フィルター・ソート済みの出展社リスト
   */
  const getFilteredExhibitorList = (list: Exhibitors): Exhibitors => {
    // 元データを変更しないように新しい配列を作る
    let result: Exhibitors = list

    // フィルタリング（お気に入り）
    if (favorite.value) {
      result = filterByFavorites(result, myFavorites.value)
    }

    // フィルタリング（ジャンル）
    if (genres.value.length !== 0) {
      result = filterByGenres(result, genres.value)
    }

    // フィルタリング（海外・国内）
    if (overseas.value !== undefined) {
      result = filterByOverseas(result, overseas.value)
    }

    // キーワード検索
    if (keyword.value && keyword.value.trim() !== '') {
      result = searchByKeyword(result, keyword.value, searchWithinKeys)
    }

    // ソート
    if (sort.value !== 'search') {
      result = sortExhibitorList(result, sort.value)
    }

    return result
  }

  return {
    exhibitorList,
    numExhibitorList,
  }
}
