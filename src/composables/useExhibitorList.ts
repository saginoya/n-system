import { ref, computed, onMounted, watch, readonly } from 'vue'

import { useExhibitorListFavorite } from '@/composables/useExhibitorListFavorite'
import type {
  Exhibitors,
  SortType,
  JsonExhibitor,
  Lang,
  GenreID,
  ExhibitorSearchKey,
} from '@/types'
import { EXHIBITOR_SEARCH_KEYS } from '@/types'
import { getJson } from '@/utils'
import {
  convertJSONToExhibitorList,
  countExhibitors,
  filterByFavorites,
  filterByGenres,
  filterByOverseas,
  searchByKeyword,
  sortExhibitorList,
} from '@/utils/exhibitorList'

const searchWithinKeys: ExhibitorSearchKey[] = EXHIBITOR_SEARCH_KEYS

/**
 * 未加工の出展社リストからフィルターやソートを適用した出展社リストを生成する
 * @param listSrc - 出展社JSONファイルのパス
 * @param favoriteKey - お気に入り情報を保存するlocalStorage キー
 * @param lang - 現在の言語（'ja' | 'en'）
 * @param converterGenreID - ジャンルIDを表示用名称に変換する関数
 * @returns {Object} 出展社リスト、フィルター状態、更新関数
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

  // 出展社リストの未加工データ
  const rawExhibitorList = ref<Exhibitors>([])

  // 未加工の出展社リストの件数
  const numRawExhibitorList = computed<number>(() => {
    return countExhibitors(rawExhibitorList.value)
  })

  // **
  // フィルターやソートを適用した出展社リスト
  //  **

  // フィルターやソートを適用した出展社リスト
  const exhibitorList = computed<Exhibitors>(() => {
    return getFilteredExhibitorList(rawExhibitorList.value)
  })

  // フィルターやソートを適用した出展社リスト件数
  const numExhibitorList = computed(() => countExhibitors(exhibitorList.value))

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

    // フィルタリング（海外・国内）
    if (stateOverseas.value !== undefined) {
      result = filterByOverseas(result, stateOverseas.value)
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
  // フィルターの条件（国内・海外）
  const stateOverseas = ref<boolean | undefined>(undefined)
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

  // 海外・国内の更新関数
  const updateStateOverseas = (value: boolean | undefined): void => {
    stateOverseas.value = value
  }
  // 海外・国内の更新関数（削除）
  const removeStateOverseas = (): void => {
    stateOverseas.value = undefined
  }

  // **
  // 一覧の取得状況
  // **

  // 一覧リストの生成中
  const isDataReady = ref<boolean>(false)

  /**
   * 検索・フィルター条件の変更を監視
   * exhibitorListが再計算される際に取得状況フラグを更新
   */
  watch(
    [rawExhibitorList, stateKeyword, stateGenres, stateOverseas, stateSort, stateFavorite],
    () => {
      isDataReady.value = true
    },
    { flush: 'post' },
  )

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
    numRawExhibitorList,
    numExhibitorList,
    myFavorites: readonly(myFavorites),
    numMyFavorites: readonly(numMyFavorites),
    isDataReady: readonly(isDataReady),
    stateFavorite,
    stateKeyword,
    stateGenres,
    stateOverseas,
    stateSort,
    switchFavorite,
    includedFavorites,
    updateStateKeyword,
    removeStateKeyword,
    updateStateSort,
    updateStateGenres,
    addStateGenres,
    removeStateGenres,
    updateStateOverseas,
    removeStateOverseas,
  }
}
