export const useHTML = () => {
  type Lang = 'ja' | 'en'
  const getLang = (): Lang => {
    const docLang = document.documentElement.lang
    return docLang === 'ja' ? 'ja' : 'en'
  }

  return {
    getLang
  }
}
