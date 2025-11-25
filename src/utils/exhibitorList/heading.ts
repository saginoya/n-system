import type { SortType } from '@/types'

/**
 * 総合的な情報から小見出しを決定
 */
export const generateHeading = (
  sort: SortType,
  name: string,
  genre: string,
): string | undefined => {
  if (sort === 'search') return undefined

  return sort === 'koma' ? generateHeadingByKoma(genre) : generateHeadingByName(name)
}

/**
 * 小間番号ソート時の小見出し生成
 */
const generateHeadingByKoma = (genre: string): string => genre

/**
 * 名前順ソート時の小見出し生成
 * 頭文字を返す
 * @param name - 名称（ただし表記ではなくフリガナ）
 */
const generateHeadingByName = (name: string): string => {
  return name.slice(0, 1)
}
