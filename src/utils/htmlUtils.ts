import type { Lang } from '@/types'

export const getDocumentLanguage = (): Lang => {
  const docLang = document.documentElement.lang
  if (!docLang) {
    console.warn('Document language is not set. Defaulting to "en".')
    return 'en'
  }
  return docLang === 'ja' ? 'ja' : 'en'
}

/**
 * ボディの表示/非表示を設定する
 * ローディング中に不完全なコンテンツが表示されるのを防ぐために使用する
 * @param visible - 表示する場合はtrue、非表示にする場合はfalse
 */
export const setBodyVisibility = (visible: boolean = true) => {
  if (!document.body) {
    console.error('Document body is not available.')
    return
  }
  document.body.style.visibility = visible ? 'visible' : 'hidden'
}
