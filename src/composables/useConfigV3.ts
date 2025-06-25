import { onMounted, ref } from 'vue'

import { useRouter } from '@/composables/useRouter'
import type { Router } from '@/types'
import { getJson } from '@/utils'

type Navigation = {
  id: string
  name: string
  type: 'link' | 'group'
  children: string[]
}

type Config = {
  siteTitle: string[]
  copyright: string
  navigation: Navigation[]
  router: Router[]
}

const { updateData } = useRouter()

export const useConfig = (jsonPath: string) => {
  const siteTitle = ref<string[]>()
  const copyright = ref<string>()
  const navigation = ref<Navigation[]>()
  onMounted(async () => {
    const config = await getJson<Config>(jsonPath)
    siteTitle.value = config.siteTitle
    copyright.value = config.copyright
    navigation.value = config.navigation
    updateData(config.router)
  })

  return {
    siteTitle,
    copyright,
    navigation,
  }
}
