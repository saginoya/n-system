import { onMounted, ref } from 'vue'

import { useRouter } from '@/composables/useRouter'
import type { Config, Navigation, Image } from '@/types'
import { getJson } from '@/utils'

const { updateData } = useRouter()

export const useConfig = (jsonPath: string) => {
  const siteTitle = ref<string[]>()
  const copyright = ref<string>()
  const navigation = ref<Navigation[]>()
  const logoImage = ref<Image | undefined>()
  onMounted(async () => {
    const config = await getJson<Config>(jsonPath)
    siteTitle.value = config.siteTitle
    copyright.value = config.copyright
    navigation.value = config.navigation
    logoImage.value = config.logoImage
    updateData(config.router)
  })

  return {
    siteTitle,
    copyright,
    navigation,
    logoImage,
  }
}
