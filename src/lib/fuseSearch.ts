import Fuse from 'fuse.js'

export type FuseSearchOptions<T> = {
  keys: Extract<keyof T, string>[] // 検索対象のキー（stringのみ）
  threshold?: number // 一致度の閾値（デフォルト: 0.6）
  includeScore?: boolean // スコアを含めるか（デフォルト: false）
}

/**
 * Fuse.jsを利用した検索関数
 * @param list 検索対象のリスト
 * @param keyword 検索キーワード
 * @param options 検索オプション
 * @returns 検索結果
 */
export const fuseSearch = <T>(list: T[], keyword: string, options: FuseSearchOptions<T>): T[] => {
  const fuse = new Fuse(list, {
    keys: options.keys,
    threshold: options.threshold ?? 0.6,
    includeScore: options.includeScore ?? false,
  })

  return fuse.search(keyword).map((result) => result.item)
}
