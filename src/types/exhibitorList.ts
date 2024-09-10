import type { Color } from '@/types/color'

export type SortType = 'name' | 'koma'
export type Exhibitions = {
  [key: string]: {
    ja: string
    en: string
    color: Color
  }
}
export type ExhibitorID = string
export type Favorites = ExhibitorID[]
export type Exhibitor = {
  id: ExhibitorID
  name: string
  order: string
  koma: string
  exhibition: string
  genre?: string
  color?: Color
  subName?: string
  webSite?: string
  contents?: string
  categories?: string[]
  sdgs?: number[]
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
  sdgs: number[]
}
