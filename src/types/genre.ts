import type { Color } from './color'

export type GenreID = string
export type Genre = {
  id: GenreID
  name: string
  nameEng: string
}

export type ExhibitionID = string
export type Exhibition = {
  id: ExhibitionID
  name: string
  nameEng: string
  color: Color
  genres: GenreID[]
}

export type GenreJson = {
  exhibitions: Exhibition[]
  genres: Genre[]
}
