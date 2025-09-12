import { ref, computed, onMounted, readonly } from 'vue'

import { useExhibitorListFavorite } from '@/composables/useExhibitorListFavorite'
import { useGenres } from '@/composables/useGenres'
import type { Exhibitor, Exhibitors, SortType, JsonExhibitor, Lang } from '@/types'
import { getJson } from '@/utils'
import { convertJSONToExhibitorList, countExhibitors } from '@/utils/exhibitorList'
import {
  filterByFavorites,
  filterByGenres,
  searchByKeyword,
  sortExhibitorList,
} from '@/utils/exhibitorList'

type ExhibitorItem = keyof Exhibitor

const searchWithinKeys: ExhibitorItem[] = ['name', 'koma', 'subName', 'contents', 'genre'] as const

/**
 * 未加工の出展社リストからフィルターやソートを適用した出展社リストを生成する
 * @param rawExhibitorList - 未加工の出展社リスト
 * @param options - オプション（フィルター・ソート）{favorites, keyword, genres, sort}
 * @returns
 */
export const useExhibitorList = (
  listSrc: string,
  genreSrc: string,
  favoriteKey: string,
  lang: Lang,
) => {
  // **
  // 取得したいデータの定義
  //  **

  // ジャンルを取得
  const { getGenreNameFromID, genres } = useGenres(genreSrc)

  // お気に入り機能
  const { myFavorites, switchFavorite, includedFavorites } = useExhibitorListFavorite(favoriteKey)

  // **
  // 出展社リスト
  //  **

  // 出展社リストの未加工データ
  const rawExhibitorList = ref<Exhibitors>([])

  // 未加工の出展社リストの件数
  const numRawExhibitorList = computed<number>(() => {
    return countExhibitors(rawExhibitorList.value)
  })

  // フィルターやソートを適用した出展社リスト
  const exhibitorList = computed<Exhibitors>(() => {
    // 取得状況の更新
    isLoading.value = true

    let list = rawExhibitorList.value

    // フィルタリング（お気に入り）
    if (stateFavorite.value) {
      list = filterByFavorites(list, myFavorites.value)
    }

    // フィルタリング（ジャンル）
    if (stateGenres.value.length !== 0) {
      list = filterByGenres(list, stateGenres.value)
    }

    // キーワード検索
    if (stateKeyword.value) {
      list = searchByKeyword(list, stateKeyword.value, searchWithinKeys)
    }

    // ソート
    if (stateSort.value !== 'search') {
      list = sortExhibitorList(list, stateSort.value)
    }

    // 取得状況の更新
    isLoading.value = false

    return list
  })

  // フィルターやソートを適用した出展社リスト件数
  const numExhibitorList = computed(() => countExhibitors(exhibitorList.value))

  // **
  // 検索・フィルター・ソートの状態管理
  // **

  // フィルターの条件（キーワード）
  const stateKeyword = ref<string>('')
  // フィルターの条件（ジャンルやエリア）
  const stateGenres = ref<string[]>([])
  // フィルターの条件（お気に入り）
  const stateFavorite = ref<boolean>(false)
  // ソートの条件
  const stateSort = ref<SortType>('order')

  // キーワードの更新関数
  const updateStateKeyword = (value: string): void => {
    stateKeyword.value = value
  }

  // ソートの更新関数
  const updateStateSort = (value: SortType): void => {
    stateSort.value = value
  }

  // ジャンルの更新関数
  const addStateGenres = (value: string): void => {
    stateGenres.value.push(value)
  }
  const removeStateGenres = (value: string): void => {
    stateGenres.value.filter((genre) => genre !== value)
  }

  // **
  // 一覧の取得状況
  // **

  // 一覧リストの生成中
  const isLoading = ref<boolean>(true)

  // **
  // Mounted時の処理
  // **

  // JSONファイルを取得して出展社リストを初期化
  onMounted(async () => {
    await genres.value
    const json = await getJson<JsonExhibitor[]>(listSrc)

    rawExhibitorList.value = await convertJSONToExhibitorList(json, lang, getGenreNameFromID)
  })

  return {
    exhibitorList,
    numRawExhibitorList: readonly(numRawExhibitorList),
    numExhibitorList: readonly(numExhibitorList),
    genres: readonly(genres),
    myFavorites: readonly(myFavorites),
    isLoading,
    stateFavorite,
    stateKeyword,
    stateGenres,
    stateSort,
    switchFavorite,
    includedFavorites,
    updateStateKeyword,
    updateStateSort,
    addStateGenres,
    removeStateGenres,
  }
}
