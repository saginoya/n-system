import type { SDGsNum } from './sdgs'

// 出展社UUID
export type ExhibitorID = string

// SDGsの形式
export type SDGs = SDGsNum[]

// 出展社情報の形式
export type Exhibitor = {
  id: ExhibitorID
  name: string
  order: string
  koma: string
  genre?: string
  subName?: string
  webSite?: string
  contents?: string
  sdgs?: SDGs
  isFavorite: boolean
}
// JSONの出展社情報の形式
export type JsonExhibitor = {
  id: string
  koma: string
  genre: string
  genreEng: string
  exhibition: string
  overseas: boolean
  name: string
  nameEng: string
  order: string
  orderEng: string
  webSite: string
  contents: string
  contentsEng: string
  categories: string[]
  categoriesEng: string[]
  sdgs: SDGs
}

// ソートの条件（ソート用文字列・小間番号・検索の一致順）
export type SortType = 'order' | 'koma' | 'search'
