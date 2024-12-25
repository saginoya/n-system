import { ref } from 'vue'
import type { Lang } from '@/types/lang'

export const useLang = () => {
  const lang = ref<Lang>('en')

  const setDocLang = () => {
    const docLang = document.documentElement.lang
    lang.value = docLang === 'ja' ? 'ja' : 'en'
  }

  // Init
  setDocLang()

  return {
    lang,
  }
}
