import type { ExhibitionID, GenreID } from './genre'
import type { SDGsNum } from './sdgs'

// 出展社UUID
export type ExhibitorID = string

// お気に入り登録配列の形式
export type Favorites = ExhibitorID[]

// SDGsの形式
export type SDGs = SDGsNum[]

// 出展社情報の形式
export type Exhibitor = {
  id: ExhibitorID
  name: string
  order: string
  koma: string
  genre: GenreID
  genreName: string | undefined
  overseas: boolean
  country: string
  subName?: string
  exhibition?: ExhibitionID
  webSite?: string
  contents?: string
  sdgs?: SDGs
}
// 出展社情報一覧
export type Exhibitors = Exhibitor[]

// JSONの出展社情報の形式
export type JsonExhibitor = {
  id: string
  koma: string
  genre: string
  exhibition: string
  overseas: boolean
  countryEng: string
  country: string
  name: string
  nameEng: string
  order: string
  orderEng: string
  webSite: string
  contents: string
  contentsEng: string
  sdgs: SDGs
}

// ソートの条件（ソート用文字列・小間番号・検索の一致順）
export type SortType = 'order' | 'koma' | 'search'
