/**
 * JSONファイルをフェッチしてパースする
 * @param src - JSONファイルのURL
 * @returns パースされたJSONデータ
 * @throws {Error} フェッチまたはパースに失敗した場合
 */
export const getJson = async <T = unknown>(src: string): Promise<T> => {
  try {
    const res = await fetch(src)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    return await res.json()
  } catch (e) {
    console.error('JSONファイルの取得に失敗しました:', e)
    throw e
  }
}

/**
 * JSON文字列をパースする
 * @param jsonString - パースするJSON文字列
 * @returns パースされたJSONデータ
 * @throws {Error} パースに失敗した場合
 */
export const parseJson = <T = unknown>(jsonString: string): T => {
  try {
    return JSON.parse(jsonString)
  } catch (e) {
    console.error('JSON文字列のパースに失敗しました:', e)
    throw e
  }
}

/**
 * オブジェクトをJSON文字列に変換する
 * @param data - 変換するオブジェクト
 * @returns JSON文字列
 * @throws {Error} 変換に失敗した場合
 */
export const stringifyJson = (data: unknown): string => {
  try {
    return JSON.stringify(data, null, 2)
  } catch (e) {
    console.error('オブジェクトのJSON文字列化に失敗しました:', e)
    throw e
  }
}

/**
 * JSONデータのバリデーションを行う
 * @param data - バリデーションするデータ
 * @param schema - バリデーションスキーマ
 * @returns バリデーション結果
 */
export const validateJson = <T>(data: unknown, schema: Record<string, unknown>): data is T => {
  try {
    // 簡易的なバリデーション
    // 実際のプロジェクトでは、zodやyupなどのバリデーションライブラリの使用を推奨
    return Object.keys(schema).every((key) => {
      const value = (data as Record<string, unknown>)[key]
      const expectedType = typeof (schema[key] as unknown)
      return typeof value === expectedType
    })
  } catch (e) {
    console.error('JSONデータのバリデーションに失敗しました:', e)
    return false
  }
}

/**
 * JSONデータをキャッシュ付きで取得する
 * @param src - JSONファイルのURL
 * @param cacheTime - キャッシュの有効期間（ミリ秒）
 * @returns パースされたJSONデータ
 */
export const getJsonWithCache = async <T = unknown>(
  src: string,
  cacheTime: number = 5 * 60 * 1000, // デフォルト5分
): Promise<T> => {
  const cacheKey = `json_cache_${src}`
  const cached = localStorage.getItem(cacheKey)

  if (cached) {
    const { data, timestamp } = parseJson<{ data: T; timestamp: number }>(cached)
    if (Date.now() - timestamp < cacheTime) {
      return data
    }
  }

  const data = await getJson<T>(src)
  localStorage.setItem(cacheKey, stringifyJson({ data, timestamp: Date.now() }))
  return data
}
