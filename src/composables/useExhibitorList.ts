import { ref, computed, onMounted } from 'vue'
import { useJson } from '@/utils/useJson'
import { useGenres } from '@/composables/useGenres'
import { useExhibitorListFilter } from '@/composables/useExhibitorListFilter'
import { useExhibitorListHeading } from '@/composables/useExhibitorListHeading'
import { useExhibitorListSort } from '@/composables/useExhibitorListSort'
import type { Lang } from '@/types/lang'
import type { Exhibitor, JsonExhibitor, Exhibitions } from '@/types/exhibitorList'

export const useExhibitorList = (
  lang: Lang,
  listSrc: string,
  genresSrc: string,
  exhibitions: Exhibitions
) => {
  // 言語は日本語か
  const isJapanese = lang === 'ja'

  // 状態管理
  // 出展社リスト
  const exhibitorList = ref<Exhibitor[]>([])

  // JSONファイルを取得して出展社リストを初期化
  onMounted(async () => {
    await genres.value
    const json = await useJson(listSrc)

    await json.map((items: JsonExhibitor) => {
      if (!isJapanese && !items.nameEng) return
      exhibitorList.value.push(applyExhibitor(items))
    })

    await replaceList()
  })

  // モジュールの読み込み
  const { getGenreNameFromID, genres } = useGenres(genresSrc)
  const { stateSort, setStateSort, replaceList } = useExhibitorListSort(exhibitorList)
  const {
    stateKeyword,
    stateExhibition,
    numberOfVisibleExhibitors,
    setStateExhibition,
    validateExhibitor
  } = useExhibitorListFilter(exhibitorList)
  const { headings } = useExhibitorListHeading(exhibitorList, stateSort, lang, validateExhibitor)

  // JSONの出展社情報をリストの形式に変換する関数
  const applyExhibitor = (value: JsonExhibitor): Exhibitor => {
    return {
      id: value.id,
      name: isJapanese ? value.name : value.nameEng,
      order: isJapanese ? value.order : value.orderEng || value.nameEng,
      subName: isJapanese ? value.nameEng : '',
      exhibition: exhibitions[value.exhibition][lang],
      genre: getGenreNameFromID(value.genre, lang),
      koma: toBoothNumber(value.koma),
      color: exhibitions[value.exhibition].color,
      webSite: value.webSite,
      contents: isJapanese ? value.contents : value.contentsEng,
      categories: isJapanese ? value.categories : value.categoriesEng,
      sdgs: value.sdgs
    }
  }

  // 英語の場合は屋外出展社の小間番号を変換する
  const toBoothNumber = (boothNumber: string) => {
    if (isJapanese || !boothNumber.includes('外')) {
      return boothNumber
    } else {
      return boothNumber.replace('外', 'Z')
    }
  }

  // 出展社の全件数
  const numberOfExhibitors = computed<number>(() => {
    return exhibitorList.value ? exhibitorList.value.length : 0
  })

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
    genres,
    headings
  }
}
