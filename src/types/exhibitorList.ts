export type SortType = string
export type ExhibitionName = string
export type Exhibitor = {
  id: string
  name: string
  koma?: string
  genre?: string
  genreEng?: string
  exhibition?: string
  overseas?: boolean
  nameEng?: string
  order?: string
  orderEng?: string
  webSite?: string
  contents?: string
  contentsEng?: string
  categories?: string[]
  categoriesEng?: string[]
  sdgs?: number[]
}
export type Genre = {
  id: string
  name: string
  nameEng: string
}
