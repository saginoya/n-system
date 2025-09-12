import type { Exhibitors, ExhibitorID } from '@/types'

/**
 * 出展社のリストをお気に入りで絞り込む
 * @param list
 * @param favorites
 * @returns
 */
export const filterByFavorites = (list: Exhibitors, favorites: ExhibitorID[]) => {
  if (favorites.length === 0) return []
  return list.filter((exhibitor) => favorites.includes(exhibitor.id))
}

/**
 * 出展社のリストをジャンルで絞り込む
 * @param list
 * @param genres
 * @returns
 */
export const filterByGenres = (list: Exhibitors, genres: string[]) => {
  return list.filter(
    (exhibitor) => exhibitor.genre !== undefined && genres.includes(exhibitor.genre),
  )
}
