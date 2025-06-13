/**
 * URLのパスを正規化する
 * @param path - 正規化するパス
 * @returns 正規化されたパス（末尾のindex.htmlやスラッシュを除去）
 */
export const normalizePath = (path: string): string => {
  if (!path) {
    console.error('パスが指定されていません。')
    return '/'
  }
  // /index.htmlを除去
  let normalized = path.replace(/\/index\.html$/, '')
  // 末尾のスラッシュを除去（ただしルートは除かない）
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}

/**
 * 指定されたリンクが現在のページかどうかを判定する
 * @param link - 判定対象のリンク（絶対URLまたは相対パス）
 * @returns 現在のページの場合はtrue、それ以外はfalse
 */
export const isCurrentPage = (link: string): boolean => {
  if (!link) {
    console.error('リンクが指定されていません。')
    return false
  }

  if (typeof document === 'undefined') {
    console.error('documentが利用できません。')
    return false
  }

  const currentUrl = new URL(document.location.href)
  let linkUrl: URL

  try {
    linkUrl = new URL(link, document.location.origin)
  } catch (error) {
    console.error('無効なURLです:', link)
    console.error(error)
    return false
  }

  const currentPath = normalizePath(currentUrl.origin + currentUrl.pathname)
  const linkPath = normalizePath(linkUrl.origin + linkUrl.pathname)

  return currentPath === linkPath
}
