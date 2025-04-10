export const useURL = () => {
  const currentUrl = new URL(document.location.href)

  const normalizePath = (path: string): string => {
    // `index.html`が末尾にある場合は除去する
    return path.replace(/\/index\.html$/, '/')
  }

  const isSamePage = (link: string): boolean => {
    let linkUrl: URL
    try {
      // linkが絶対URLであればそのままnew URLに渡し、
      // 相対パスであればdocument.location.originをベースにしてnew URLに渡す
      linkUrl = new URL(link, document.location.origin)
    } catch (error) {
      console.error('Invalid URL:', link)
      console.error(error)
      return false
    }

    const currentPath = normalizePath(currentUrl.origin + currentUrl.pathname)
    const linkPath = normalizePath(linkUrl.origin + linkUrl.pathname)

    return currentPath === linkPath
  }

  return {
    isSamePage,
  }
}
