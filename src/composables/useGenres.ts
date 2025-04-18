import { ref, onMounted } from 'vue'

import type { Lang, Genre } from '@/types'
import { getJson } from '@/utils'

export const useGenres = (src: string) => {
  // ジャンルのリスト
  const genres = ref<Genre[]>()

  onMounted(async () => {
    genres.value = await getJson(src)
  })

  // ジャンル記号からジャンル名を取得する関数
  const getGenreNameFromID = (value: string, lang: Lang): string => {
    if (!genres.value) {
      console.error('Could not retrieve genre list')
      return value
    }

    for (const genre of genres.value) {
      if (value === genre.id) {
        switch (lang) {
          case 'ja':
            return genre.name
          default:
            return genre.nameEng
        }
      }
    }

    return value
  }

  return {
    genres,
    getGenreNameFromID,
  }
}
