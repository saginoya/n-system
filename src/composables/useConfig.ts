import { readonly, onMounted, ref } from 'vue'
import { useJson } from '../utils/useJson.js'
import { useLang } from './useLang.js'

export const useConfig = () => {
  const configSrcJa = './../json/config.json'
  const configSrcEn = './../json/config-eng.json'
  const { lang } = useLang()
  const configSrc = lang.value === 'en' ? configSrcEn : configSrcJa

  const siteTitle = ref()
  const copyright = ref()
  const navigation = ref({})
  onMounted(async () => {
    const config = await useJson(configSrc)
    siteTitle.value = config.siteTitle
    copyright.value = config.copyright
    navigation.value = config.navigation
  })

  return {
    siteTitle: readonly(siteTitle),
    copyright: readonly(copyright),
    navigation: readonly(navigation)
  }
}
