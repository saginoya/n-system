import { ref, computed, onMounted } from 'vue'
import { useJson } from '@/utils/useJson'
import { useText } from '@/utils/useText'
import { useGenres } from '@/composables/useGenres'
import type { Lang } from '@/types/lang'
import type { Exhibitor, JsonExhibitor, SortType, Exhibitions } from '@/types/exhibitorList'

export const useExhibitorList = (
  lang: Lang,
  listSrc: string,
  genresSrc: string,
  exhibitions: Exhibitions
) => {
  // ジャンルの取得
  const { getGenreNameFromID, genres } = useGenres(genresSrc)

  // 出展社リスト
  const exhibitorList = ref<Exhibitor[]>([])

  // JSONファイルを取得して出展社リストを初期化
  onMounted(async () => {
    const json = await useJson(listSrc)

    exhibitorList.value = await json.map((item: JsonExhibitor) => {
      return applyExhibitor(item)
    })

    await replaceList()
  })

  // 言語は日本語か
  const isJapanese = lang === 'ja'

  // JSONの出展社情報をリストの形式に変換する関数
  const applyExhibitor = (value: JsonExhibitor): Exhibitor => {
    return {
      id: value.id,
      name: isJapanese ? value.name : value.nameEng,
      order: isJapanese ? value.order : value.orderEng,
      subName: isJapanese ? value.nameEng : '',
      exhibition: exhibitions[value.exhibition][lang],
      genre: getGenreNameFromID(value.genre, lang),
      koma: value.koma,
      color: exhibitions[value.exhibition].color,
      webSite: value.webSite,
      contents: isJapanese ? value.contents : value.contentsEng,
      categories: isJapanese ? value.categories : value.categoriesEng,
      sdgs: value.sdgs
    }
  }

  // 出展社の全件数
  const numberOfExhibitors = computed<number>(() => {
    return exhibitorList.value ? exhibitorList.value.length : 0
  })

  // フィルター条件に一致する出展社の件数
  const numberOfVisibleExhibitors = computed<number>(() => {
    return exhibitorList.value.filter(validateExhibitor).length
  })

  // ソートの条件
  const stateSort = ref<SortType>()
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

  // フィルターの条件（キーワード）
  const stateKeyword = ref<string>('')

  // フィルターの条件（展示会）
  const stateExhibition = ref<string[]>([])
  const setStateExhibition = (name: string, active: boolean) => {
    if (active) {
      if (stateExhibition.value.includes(name)) return
      stateExhibition.value.push(name)
    } else {
      if (!stateExhibition.value.includes(name)) return
      const index = stateExhibition.value.indexOf(name)
      stateExhibition.value.splice(index, 1)
    }
  }

  // お気に入り機能

  // 出展社を検索条件に一致するか検査する関数
  const { katakanaToHiragana } = useText()
  const validateExhibitor = (value: Exhibitor): boolean => {
    if (!stateExhibition.value.includes(value.exhibition)) return false
    if (!stateKeyword.value) return true

    const keyword = katakanaToHiragana(stateKeyword.value.toLowerCase())
    const subjects = [
      value.name,
      value.subName,
      value.koma,
      value.genre,
      value.contents,
      value.categories
    ]
    const subject = katakanaToHiragana(subjects.join('・').toLowerCase())

    return subject.includes(keyword)
  }

  /*   const filterFavorite = (id: string) => {
    if (stateFavorite.value) {
      return myFavorites.value.includes(id)
    } else {
      return true
    }
  } */

  return {
    exhibitorList,
    numberOfExhibitors,
    numberOfVisibleExhibitors,
    stateSort,
    setStateSort,
    stateExhibition,
    setStateExhibition,
    validateExhibitor,
    stateKeyword,
    genres
  }
}
