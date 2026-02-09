import { ref } from 'vue'

import type { ExhibitorProfileProps } from '@/components/features/exhibitors/ExhibitorProfile.vue'
import type { Exhibition, Exhibitor, Lang } from '@/types'

import type { Ref } from 'vue'

type ExhibitorProfileOmitFavorite = Omit<ExhibitorProfileProps, 'isFavorite' | 'favoriteMethod'>

export const useExhibitorProfile = (exhibitionsMap: Ref<Record<string, Exhibition>>) => {
  const currentExhibitor = ref<ExhibitorProfileOmitFavorite | undefined>()

  // 出展社情報からPropsをセットする関数
  const setCurrentExhibitor = (exhibitor: Exhibitor, lang: Lang) => {
    currentExhibitor.value = convertToExhibitorProfileProps(exhibitor, lang)
  }

  // Propsをリセットする関数
  const resetCurrentExhibitor = () => {
    currentExhibitor.value = undefined
  }

  // 出展社情報をプロフィールコンポーネントのProps形式に変換する関数
  const convertToExhibitorProfileProps = (
    exhibitor: Exhibitor,
    lang: Lang,
  ): ExhibitorProfileOmitFavorite => {
    // 展示会ID
    const exhibitionID = exhibitor.exhibition

    // 展示会を割り出す関数
    const getExhibition = (id: string | undefined) => {
      if (!exhibitionsMap.value || !id) return
      return exhibitionsMap.value[id]
    }

    // 展示会名を返す関数
    const getExhibitionName = (id: string | undefined) => {
      const exhibition = getExhibition(id)
      return exhibition ? exhibition[lang === 'ja' ? 'name' : 'nameEng'] : undefined
    }

    // 色を割り出す関数
    const getExhibitionColor = (id: string | undefined) => {
      const exhibition = getExhibition(id)
      return exhibition ? exhibition.color : undefined
    }

    return {
      lang,
      id: exhibitor.id,
      name: exhibitor.name,
      koma: exhibitor.koma,
      overseas: exhibitor.overseas,
      country: exhibitor.country,
      exhibition: getExhibitionName(exhibitionID),
      subName: exhibitor.subName,
      genre: exhibitor.genreName,
      webSite: exhibitor.webSite,
      contents: exhibitor.contents,
      sdgs: exhibitor.sdgs,
      color: getExhibitionColor(exhibitionID),
    }
  }

  return { currentExhibitor, setCurrentExhibitor, resetCurrentExhibitor }
}
