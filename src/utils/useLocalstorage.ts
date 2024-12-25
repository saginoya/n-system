export const useLocalStorage = (name: string) => {
  const set = (value: string) => {
    localStorage.setItem(name, value)
  }

  const get = () => {
    return localStorage.getItem(name)
  }

  const remove = () => {
    localStorage.removeItem(name)
  }

  return {
    set,
    get,
    remove,
  }
}
