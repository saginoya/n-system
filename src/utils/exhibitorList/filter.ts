import type { Exhibitors, ExhibitorID } from '@/types'

/**
 * 出展社のリストをお気に入りで絞り込む
 * @param list
 * @param favorites
 * @returns
 */
export const filterByFavorites = (list: Exhibitors, favorites: ExhibitorID[]): Exhibitors => {
  if (favorites.length === 0) return []
  return list.filter((exhibitor) => favorites.includes(exhibitor.id))
}

/**
 * 出展社のリストをジャンルで絞り込む
 * @param list
 * @param genres
 * @returns
 */
export const filterByGenres = (list: Exhibitors, genres: string[]): Exhibitors => {
  return list.filter(
    (exhibitor) => exhibitor.genre !== undefined && genres.includes(exhibitor.genre),
  )
}

/**
 * 出展社のリストを海外・国内で絞り込む
 * @param list
 * @param overseas
 * @returns
 */
export const filterByOverseas = (list: Exhibitors, overseas: boolean): Exhibitors => {
  return list.filter((exhibitor) => exhibitor.overseas === overseas)
}
