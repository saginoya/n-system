import { ref, computed, onMounted, readonly } from 'vue'

import type { Exhibitors, JsonExhibitor, Lang } from '@/types'
import { getJson } from '@/utils'
import { convertJSONToExhibitorList, countExhibitors } from '@/utils/exhibitorList'

export const useExhibitorData = (src: string, lang: Lang, options = { autoLoad: true }) => {
  // 出展社リストの未加工データ
  const rawExhibitorList = ref<Exhibitors>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // 未加工の出展社リストの件数
  const numRawExhibitorList = computed<number>(() => {
    return countExhibitors(rawExhibitorList.value)
  })

  // 非同期通信で出展社データを取得
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

  if (options.autoLoad) {
    onMounted(() => {
      void load()
    })
  }

  return {
    rawExhibitorList: computed(() => rawExhibitorList.value),
    numRawExhibitorList,
    isLoading: readonly(isLoading),
    error: readonly(error),
    load,
  }
}
