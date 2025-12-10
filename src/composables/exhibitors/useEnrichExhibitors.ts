import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Exhibitors, Genre, Lang } from '@/types'

export const useEnrichExhibitors = (
  rawExhibitors: Ref<Exhibitors | undefined>,
  genresMap: Ref<Record<string, Genre> | undefined>,
  lang: Ref<Lang>,
) => {
  // ジャンルデータと出展社データの両方が揃ったかを判定
  const isReady = computed(() => {
    return rawExhibitors?.value && rawExhibitors.value.length > 0 && genresMap?.value
  })

  const enrichedExhibitors = computed(() => {
    // まだデータが揃っていなければ空配列を返す
    if (!isReady.value) {
      return []
    }

    const raw = rawExhibitors.value ?? []
    const map = genresMap.value ?? {}
    const isJa = lang?.value === 'ja'

    return raw.map((e) => {
      const genreObj = map[e.genre]
      const genreName = genreObj ? (isJa ? genreObj.name : genreObj.nameEng) : undefined
      return { ...e, genreName }
    })
  })

  return { enrichedExhibitors, isReady }
}

export default useEnrichExhibitors
