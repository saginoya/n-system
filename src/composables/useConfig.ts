import { onMounted, ref } from 'vue'

import { useRouter } from '@/composables/useRouter'
import type { Config, Navigation, Image } from '@/types'
import { getJson } from '@/utils'

const { updateData } = useRouter()

/**
 * Pathの`@`マークを`baseUrl`に差し替えるユーティリティー関数
 * @param url - 置換対象となるURL
 * @param baseUrl - `@`マークと差し替えるURL
 */
export const replaceAtToBase = (url: string, baseDirectory: string | undefined): string => {
  return url.replace(/@/g, baseDirectory || '')
}

export const useConfig = (jsonPath: string) => {
  const siteTitle = ref<string[]>()
  const copyright = ref<string>()
  const baseDirectory = ref<string>()
  const navigation = ref<Navigation[]>()
  const logoImage = ref<Image | undefined>()
  onMounted(async () => {
    const config = await getJson<Config>(jsonPath)
    siteTitle.value = config.siteTitle
    copyright.value = config.copyright
    baseDirectory.value = config.baseDirectory
    navigation.value = config.navigation
    logoImage.value = config.logoImage
      ? {
          width: config.logoImage.width,
          height: config.logoImage.height,
          src: replaceAtToBase(config.logoImage.src, baseDirectory.value),
          alt: config.logoImage.alt,
          caption: config.logoImage.caption,
          cover: config.logoImage.cover,
        }
      : undefined

    if (config.router) {
      const replacedRouter = config.router.map((item) => ({
        ...item,
        path: replaceAtToBase(item.path, baseDirectory.value),
      }))
      updateData(replacedRouter)
    }
  })

  return {
    siteTitle,
    copyright,
    navigation,
    logoImage,
  }
}
