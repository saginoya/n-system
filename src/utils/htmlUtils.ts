import type { Lang } from '@/types'

export const getDocumentLanguage = (): Lang => {
  const docLang = document.documentElement.lang
  if (!docLang) {
    console.warn('Document language is not set. Defaulting to "en".')
    return 'en'
  }
  return docLang === 'ja' ? 'ja' : 'en'
}

export const setBodyVisibility = (visible: boolean = true) => {
  if (!document.body) {
    console.error('Document body is not available.')
    return
  }
  document.body.style.visibility = visible ? 'visible' : 'hidden'
}
