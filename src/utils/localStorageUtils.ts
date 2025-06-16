type StorageValue = string | null

/**
 * localStorageが利用できるかどうかを判定する
 * @returns localStorageが利用できる場合はtrue、利用できない場合はfalse
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * localStorageの管理を行う
 * @param name - 管理するlocalStorageのキー
 * @returns localStorageの管理を行うオブジェクト
 */
export const localStorageManager = (name: string) => {
  // localStorageが利用できない場合は空のオブジェクトを返す
  if (!isLocalStorageAvailable()) {
    console.warn('localStorageが利用できません')
    return {
      set: () => {},
      get: () => null,
      remove: () => {},
    }
  }

  const set = (value: string) => {
    try {
      localStorage.setItem(name, value)
    } catch (error) {
      console.error('localStorageの保存に失敗しました:', error)
    }
  }

  const get = (): StorageValue => {
    try {
      return localStorage.getItem(name)
    } catch (error) {
      console.error('localStorageの取得に失敗しました:', error)
      return null
    }
  }

  const remove = () => {
    try {
      localStorage.removeItem(name)
    } catch (error) {
      console.error('localStorageの削除に失敗しました:', error)
    }
  }

  return {
    set,
    get,
    remove,
  }
}
