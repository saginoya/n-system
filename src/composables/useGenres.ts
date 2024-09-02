import { ref, onMounted } from 'vue'
import { useJson } from '@/utils/useJson'
import type { Lang } from '@/types/lang'
import type { Genre } from '@/types/genre'

export const useGenres = (src: string) => {
  // ジャンルのリスト
  const genres = ref<Genre[]>([])

  const isGenres = ref<boolean>(genres.value.length > 0)

  onMounted(async () => {
    genres.value = await useJson(src)
  })

  // ジャンル記号からジャンル名を取得する関数
  const getGenreNameFromID = (value: string, lang: Lang): string | undefined => {
    if (isGenres.value) {
      console.error('Could not retrieve genre list')
      return undefined
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
  }

  return {
    genres,
    getGenreNameFromID
  }
}
