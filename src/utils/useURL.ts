export const useURL = () => {
  const url = document.location
  const href = url.href
  const origin = url.origin
  const pathName = url.pathname

  const currentDirectory = () => {
    const array = pathName.split('/')
    const directory = array.slice(0, array.length - 1).join('/')
    return origin + directory + '/'
  }

  const samePathname = (link: string) => {
    const name = () => {
      switch (link) {
        case 'index.html':
          return ''
        case './':
          return ''
        default:
          return link
      }
    }
    const path = currentDirectory() + name()
    return path === href || path + 'index.html' === href
  }

  return {
    samePathname
  }
}
