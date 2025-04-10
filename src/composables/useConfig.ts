import { onMounted, ref } from 'vue'
import { useJson } from '@/utils'
import type { GlobalNav } from '@/types/link'
import type { Image } from '@/types/image'

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
    const config = await useJson(jsonPath)
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
