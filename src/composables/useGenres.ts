import { ref, computed, onMounted } from 'vue'

import type { GenreJson, Genre, Exhibition, ExhibitionID, GenreID, Lang } from '@/types'
import { getJson } from '@/utils'

export const useGenres = (src: string) => {
  // 展示会データ
  const exhibitions = ref<Exhibition[]>()

  // ジャンルデータ
  const genres = ref<Genre[]>()

  // 展示会データのMap
  const exhibitionsMap = computed(() => {
    if (!exhibitions.value) return {}
    return convertListToMap<Exhibition>(exhibitions.value)
  })

  // ジャンルデータのMap
  const genresMap = computed<Record<GenreID, Genre>>(() => {
    if (!genres.value) return {}
    return convertListToMap<Genre>(genres.value)
  })

  // ジャンルデータのリスト
  const genreLists = computed<Record<Lang, string[]>>(() => {
    const map = genresMap.value
    const listJa = Object.values(map).map((item) => item['name'])
    const listEn = Object.values(map).map((item) => item['nameEng'])
    return {
      ja: listJa,
      en: listEn,
    }
  })

  onMounted(async () => {
    const data: GenreJson = await getJson(src)
    exhibitions.value = data.exhibitions
    genres.value = data.genres
  })

  // ジャンルIDから展示会IDを返す関数
  const getExhibitionIDFromGenreID = (value: GenreID): ExhibitionID | undefined => {
    if (!exhibitions.value) {
      console.error('Could not retrieve exhibition list')
      return undefined
    }

    for (const exhibition of exhibitions.value) {
      if (exhibition.genres.includes(value)) {
        return exhibition.id
      }
    }

    return undefined
  }

  // ジャンルIDからジャンル名を返す関数
  const getGenreNameFromID = (value: GenreID, lang: Lang): string => {
    if (!genresMap.value) return ''
    return genresMap.value[value][lang === 'ja' ? 'name' : 'nameEng']
  }

  // リストをMapに変換する関数
  const convertListToMap = <T extends { id: string }>(list: T[]): Record<string, T> => {
    return list.reduce(
      (map, item) => {
        map[item.id] = item
        return map
      },
      {} as Record<string, T>,
    )
  }

  return {
    exhibitions,
    genres,
    exhibitionsMap,
    genresMap,
    genreLists,
    getExhibitionIDFromGenreID,
    getGenreNameFromID,
  }
}
