import { ref, computed } from 'vue'

import type { Lang } from '@/types'

export const useLang = () => {
  const docLang = document.documentElement.lang

  const lang = ref<Lang>(docLang === 'ja' ? 'ja' : 'en')
  const isJapanese = computed(() => lang.value === 'ja')

  return {
    lang,
    isJapanese,
  }
}
