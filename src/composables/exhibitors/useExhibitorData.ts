import { ref, computed, onMounted, watchEffect, readonly } from 'vue'

import type { Exhibitors, JsonExhibitor, Lang, GenreID } from '@/types'
import { getJson } from '@/utils'
import { convertJSONToExhibitorList, countExhibitors } from '@/utils/exhibitorList'

export const useExhibitorData = (
  src: string,
  lang: Lang,
  getGenreNameFromID: (value: GenreID, lang: Lang) => string,
  options = { autoLoad: true },
) => {
  // 出展社リストの未加工データ
  const rawExhibitorList = ref<Exhibitors>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // 未加工の出展社リストの件数
  const numRawExhibitorList = computed<number>(() => {
    return countExhibitors(rawExhibitorList.value)
  })

  // 非同期通信で出展社データを取得し、変換して格納する関数
  const load = async () => {
    isLoading.value = true
    error.value = null
    try {
      const json = await getJson<JsonExhibitor[]>(src)
      rawExhibitorList.value = await convertJSONToExhibitorList(json, lang)
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
    } finally {
      isLoading.value = false
    }
  }

  // オプションでオートロードが有効な場合、コンポーネントのマウント時にデータをロード
  if (options.autoLoad) {
    onMounted(() => {
      void load()
    })
  }

  // Genreがセットされていれば、ジャンル名を出展社データに付与する
  watchEffect(() => {
    rawExhibitorList.value.map((exhibitor) => {
      exhibitor.genreName = getGenreNameFromID(exhibitor.genre, lang)
      return exhibitor
    })
  })

  return {
    rawExhibitorList: computed(() => rawExhibitorList.value),
    numRawExhibitorList,
    isLoading: readonly(isLoading),
    error: readonly(error),
    load,
  }
}
