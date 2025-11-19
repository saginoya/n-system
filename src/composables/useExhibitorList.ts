import { ref, computed, onMounted, readonly } from 'vue'

import { useExhibitorListFavorite } from '@/composables/useExhibitorListFavorite'
import type { Exhibitor, Exhibitors, SortType, JsonExhibitor, Lang, GenreID } from '@/types'
import { getJson } from '@/utils'
import {
  convertJSONToExhibitorList,
  countExhibitors,
  filterByFavorites,
  filterByGenres,
  searchByKeyword,
  sortExhibitorList,
} from '@/utils/exhibitorList'

type ExhibitorItem = keyof Exhibitor

const searchWithinKeys: ExhibitorItem[] = [
  'name',
  'koma',
  'subName',
  'contents',
  'genreName',
] as const

/**
 * 未加工の出展社リストからフィルターやソートを適用した出展社リストを生成する
 * @param rawExhibitorList - 未加工の出展社リスト
 * @param options - オプション（フィルター・ソート）{favorites, keyword, genres, sort}
 * @returns
 */
export const useExhibitorList = (
  listSrc: string,
  favoriteKey: string,
  lang: Lang,
  converterGenreID: (value: string, lang: Lang) => string,
) => {
  // **
  // 取得したいデータの定義
  //  **

  // お気に入り機能
  const { myFavorites, numMyFavorites, switchFavorite, includedFavorites } =
    useExhibitorListFavorite(favoriteKey)

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
    isDataReady.value = false

    const list = getFilteredExhibitorList(rawExhibitorList.value)

    // 取得状況の更新
    isDataReady.value = true

    return list
  })

  // フィルターやソートを適用した出展社リスト件数
  const numExhibitorList = computed(() => countExhibitors(exhibitorList.value))

  // Rawリストをフィルターやソートして結果リストを返す関数
  const getFilteredExhibitorList = (list: Exhibitors): Exhibitors => {
    // 元データを変更しないように新しい配列を作る
    let result: Exhibitors = list.map((item) => ({
      ...item,
      genreName: converterGenreID(item.genre, lang),
    }))

    // フィルタリング（お気に入り）
    if (stateFavorite.value) {
      result = filterByFavorites(result, myFavorites.value)
    }

    // フィルタリング（ジャンル）
    if (stateGenres.value.length !== 0) {
      result = filterByGenres(result, stateGenres.value)
    }

    // キーワード検索
    if (stateKeyword.value) {
      result = searchByKeyword(result, stateKeyword.value, searchWithinKeys)
    }

    // ソート
    if (stateSort.value !== 'search') {
      result = sortExhibitorList(result, stateSort.value)
    }

    return result
  }

  // **
  // 検索・フィルター・ソートの状態管理
  // **

  // フィルターの条件（キーワード）
  const stateKeyword = ref<string>('')
  // フィルターの条件（ジャンルやエリア）
  const stateGenres = ref<GenreID[]>([])
  // フィルターの条件（お気に入り）
  const stateFavorite = ref<boolean>(false)
  // ソートの条件
  const stateSort = ref<SortType>('order')

  // キーワードの更新関数
  const updateStateKeyword = (value: string): void => {
    stateKeyword.value = value
  }
  // キーワードの更新関数（削除）
  const removeStateKeyword = (): void => {
    stateKeyword.value = ''
  }

  // ソートの更新関数
  const updateStateSort = (value: SortType): void => {
    stateSort.value = value
  }

  // ジャンルの更新関数
  const updateStateGenres = (values: GenreID[]): void => {
    stateGenres.value = values
  }
  // ジャンルの更新関数（追加）
  const addStateGenres = (value: GenreID): void => {
    if (!stateGenres.value.includes(value)) {
      stateGenres.value.push(value)
    }
  }
  // ジャンルの更新関数（削除）
  const removeStateGenres = (value: GenreID): void => {
    stateGenres.value = stateGenres.value.filter((genre) => genre !== value)
  }

  // **
  // 一覧の取得状況
  // **

  // 一覧リストの生成中
  const isDataReady = ref<boolean>(false)

  // **
  // Mounted時の処理
  // **

  // JSONファイルを取得して出展社リストを初期化
  onMounted(async () => {
    isDataReady.value = false
    const json = await getJson<JsonExhibitor[]>(listSrc)
    rawExhibitorList.value = await convertJSONToExhibitorList(json, lang)
    isDataReady.value = true
  })

  return {
    exhibitorList,
    numRawExhibitorList: readonly(numRawExhibitorList),
    numExhibitorList: readonly(numExhibitorList),
    myFavorites: readonly(myFavorites),
    numMyFavorites: readonly(numMyFavorites),
    isDataReady: readonly(isDataReady),
    stateFavorite,
    stateKeyword,
    stateGenres: readonly(stateGenres),
    stateSort: readonly(stateSort),
    switchFavorite,
    includedFavorites,
    updateStateKeyword,
    removeStateKeyword,
    updateStateSort,
    updateStateGenres,
    addStateGenres,
    removeStateGenres,
  }
}
