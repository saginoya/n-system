import type { Lang, Exhibitor, JsonExhibitor, Exhibitions } from '@/types'

export const convertJSONToExhibitorList = (
  jsonData: JsonExhibitor[],
  lang: Lang,
  exhibitions: Exhibitions,
  genreNameFunc?: (value: string, lang: Lang) => string,
): Exhibitor[] => {
  // 言語は日本語か
  const isJapanese = lang === 'ja'

  // 英語の場合は屋外出展社の小間番号を変換する
  const toBoothNumber = (boothNumber: string) => {
    if (isJapanese || !boothNumber.includes('外')) {
      return boothNumber
    } else {
      return boothNumber.replace('外', 'Z')
    }
  }

  // JSONの出展社情報をリストの形式に変換する関数
  const applyExhibitor = (value: JsonExhibitor): Exhibitor => {
    return {
      id: value.id,
      name: isJapanese ? value.name : value.nameEng,
      order: isJapanese ? value.order : value.orderEng || value.nameEng,
      subName: isJapanese ? value.nameEng : '',
      exhibition: exhibitions[value.exhibition][lang],
      genre: genreNameFunc ? genreNameFunc(value.genre, lang) : value.genre,
      koma: toBoothNumber(value.koma),
      color: exhibitions[value.exhibition].color,
      webSite: value.webSite,
      contents: isJapanese ? value.contents : value.contentsEng,
      categories: isJapanese ? value.categories : value.categoriesEng,
      sdgs: value.sdgs,
    }
  }

  return jsonData.map(applyExhibitor)
}
