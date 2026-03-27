import type { Lang, Exhibitor, JsonExhibitor, Exhibitors, ExhibitionID, GenreID } from '@/types'
import { isNonEmptyString } from '@/utils'

// 小間番号の変換（英語版では「外」を「Z」に変換）
export const toBoothNumber = (boothNumber: string, isJapanese: boolean): string => {
  if (isJapanese || !boothNumber.includes('外')) {
    return boothNumber
  }
  return boothNumber.replace('外', 'Z')
}

// JSONの出展社情報をExhibitor形式に変換
export const applyExhibitor = (value: JsonExhibitor, lang: Lang): Exhibitor => {
  const isJapanese = lang === 'ja'
  return {
    id: typeof value.id !== 'string' ? String(value.id) : value.id,
    name: isJapanese ? value.name : value.nameEng,
    subName: isJapanese ? value.nameEng : '',
    order: isJapanese ? value.order : value.orderEng || value.nameEng,
    koma: toBoothNumber(value.koma, isJapanese),
    exhibition: value.exhibition as ExhibitionID,
    genre: value.genre as GenreID,
    genreName: undefined,
    overseas: value.overseas,
    country: isJapanese ? value.country : value.countryEng,
    webSite: value.webSite,
    contents: isJapanese ? value.contents : value.contentsEng,
    sdgs: value.sdgs,
  }
}

// Exhibitor形式のデータに最低限の情報が入っているかチェック
const validExhibitorBasicInfo = (exhibitor: Exhibitor): boolean => {
  return (
    isNonEmptyString(exhibitor.id) &&
    isNonEmptyString(exhibitor.name) &&
    isNonEmptyString(exhibitor.koma)
  )
}

// JSONの出展社情報配列をExhibitors形式に変換
export const convertJSONToExhibitorList = (jsonData: JsonExhibitor[], lang: Lang): Exhibitors => {
  const converted = jsonData.map((value) => applyExhibitor(value, lang))
  return converted.filter((value) => validExhibitorBasicInfo(value))
}
