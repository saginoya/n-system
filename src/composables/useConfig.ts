import { readonly, onMounted, ref } from 'vue'
import { useJson } from '@/utils/useJson'
import type { GlobalNav } from '@/types/link'

type MainVisual = {
  top: string
  lower: string
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
    navigation
  }
}
