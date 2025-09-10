import type { Lang, Exhibitor, JsonExhibitor, Exhibitors } from '@/types'

// 小間番号の変換（英語版では「外」を「Z」に変換）
export const toBoothNumber = (boothNumber: string, isJapanese: boolean): string => {
  if (isJapanese || !boothNumber.includes('外')) {
    return boothNumber
  }
  return boothNumber.replace('外', 'Z')
}

// JSONの出展社情報をExhibitor形式に変換
export const applyExhibitor = (
  value: JsonExhibitor,
  lang: Lang,
  genreNameFunc?: (value: string, lang: Lang) => string,
): Exhibitor => {
  const isJapanese = lang === 'ja'
  return {
    id: typeof value.id !== 'string' ? String(value.id) : value.id,
    name: isJapanese ? value.name : value.nameEng,
    subName: isJapanese ? value.nameEng : '',
    order: isJapanese ? value.order : value.orderEng || value.nameEng,
    koma: toBoothNumber(value.koma, isJapanese),
    genre: genreNameFunc ? genreNameFunc(value.genre, lang) : value.genre,
    webSite: value.webSite,
    contents: isJapanese ? value.contents : value.contentsEng,
    sdgs: value.sdgs,
  }
}

// JSONの出展社情報配列をExhibitors形式に変換
export const convertJSONToExhibitorList = (
  jsonData: JsonExhibitor[],
  lang: Lang,
  genreNameFunc?: (value: string, lang: Lang) => string,
): Exhibitors => {
  return jsonData.map((value) => applyExhibitor(value, lang, genreNameFunc))
}
