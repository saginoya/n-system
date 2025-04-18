import { onMounted, ref } from 'vue'

import type { GlobalNav, Image } from '@/types'
import { getJson } from '@/utils'

type MainVisual = {
  top: Image
  lower: Image
}

export const useConfig = (jsonPath: string) => {
  const siteTitle = ref<string[]>()
  const copyright = ref<string>()
  const mainVisual = ref<MainVisual>()
  const navigation = ref<GlobalNav>()
  onMounted(async () => {
    const config = await getJson(jsonPath)
    siteTitle.value = config.siteTitle
    copyright.value = config.copyright
    mainVisual.value = config.mainVisual
    navigation.value = config.navigation
  })

  return {
    siteTitle,
    copyright,
    mainVisual,
    navigation,
  }
}
