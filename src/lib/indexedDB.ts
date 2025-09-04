import { ref } from 'vue'

/**
 * IndexedDBを操作するためのVue.js用の汎用的なComposable関数。
 * このユーティリティはジェネリック型をサポートしており、複数のデータ構造に対応可能です。
 *
 * @template T - データベースに保存されるデータの型。
 * @param dbName - データベースの名前。
 * @param version - データベースのバージョン。
 * @returns データベースを操作するためのメソッド群（init, put, get, getAll, deleteData, deleteDatabase）。
 */
const useIndexedDB = <T>(dbName: string, version: number) => {
  const db = ref<IDBDatabase | null>(null)

  /**
   * データベースを初期化し、必要に応じてオブジェクトストアやインデックスを作成します。
   *
   * @param objectStores - オブジェクトストアの設定情報の配列。
   */
  const init = async (
    objectStores: Array<{
      name: string
      options?: IDBObjectStoreParameters
      indexes?: Array<{ name: string; keyPath: string | string[]; options?: IDBIndexParameters }>
    }>,
  ) => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(dbName, version)

      request.onupgradeneeded = (event) => {
        const database = (event.target as IDBOpenDBRequest).result

        objectStores.forEach((store) => {
          if (!database.objectStoreNames.contains(store.name)) {
            const objectStore = database.createObjectStore(store.name, store.options)

            if (store.indexes) {
              store.indexes.forEach((index) => {
                objectStore.createIndex(index.name, index.keyPath, index.options)
              })
            }
          }
        })
      }

      request.onsuccess = (event) => {
        db.value = (event.target as IDBOpenDBRequest).result
        resolve()
      }

      request.onerror = (event) => {
        reject(`データベースのオープンに失敗しました: ${(event.target as IDBOpenDBRequest).error}`)
      }
    })
  }

  /**
   * 指定されたオブジェクトストアにデータを追加または更新します。
   *
   * @param storeName - オブジェクトストアの名前。
   * @param data - 追加または更新するデータ。
   */
  const put = async (storeName: string, data: T) => {
    return new Promise<void>((resolve, reject) => {
      if (!db.value) {
        reject('データベースが初期化されていません')
        return
      }

      const transaction = db.value.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)

      const request = store.put(data)
      request.onsuccess = () => resolve()
      request.onerror = (event) =>
        reject(`データの追加または更新に失敗しました: ${(event.target as IDBRequest).error}`)
    })
  }

  /**
   * 指定されたキーを使用して、オブジェクトストアから単一のアイテムを取得します。
   *
   * @param storeName - オブジェクトストアの名前。
   * @param key - 取得するアイテムのキー。
   * @returns 取得したアイテム、または見つからなかった場合はundefined。
   */
  const get = async (storeName: string, key: IDBValidKey): Promise<T | undefined> => {
    return new Promise<T | undefined>((resolve, reject) => {
      if (!db.value) {
        reject('データベースが初期化されていません')
        return
      }

      const transaction = db.value.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)

      const request = store.get(key)
      request.onsuccess = () => resolve(request.result)
      request.onerror = (event) =>
        reject(`データの取得に失敗しました: ${(event.target as IDBRequest).error}`)
    })
  }

  /**
   * 指定されたオブジェクトストアからすべてのアイテムを取得します。
   *
   * @param storeName - オブジェクトストアの名前。
   * @returns オブジェクトストア内のすべてのアイテムの配列。
   */
  const getAll = async (storeName: string): Promise<T[]> => {
    return new Promise<T[]>((resolve, reject) => {
      if (!db.value) {
        reject('データベースが初期化されていません')
        return
      }

      const transaction = db.value.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)

      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = (event) =>
        reject(`すべてのデータの取得に失敗しました: ${(event.target as IDBRequest).error}`)
    })
  }

  /**
   * 指定されたキーを使用して、オブジェクトストアからアイテムを削除します。
   *
   * @param storeName - オブジェクトストアの名前。
   * @param key - 削除するアイテムのキー。
   */
  const deleteData = async (storeName: string, key: IDBValidKey) => {
    return new Promise<void>((resolve, reject) => {
      if (!db.value) {
        reject('データベースが初期化されていません')
        return
      }

      const transaction = db.value.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)

      const request = store.delete(key)
      request.onsuccess = () => resolve()
      request.onerror = (event) =>
        reject(`データの削除に失敗しました: ${(event.target as IDBRequest).error}`)
    })
  }

  /**
   * データベース全体を削除します。
   */
  const deleteDatabase = async () => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase(dbName)

      request.onsuccess = () => resolve()
      request.onerror = (event) =>
        reject(`データベースの削除に失敗しました: ${(event.target as IDBRequest).error}`)
    })
  }

  return {
    init,
    put,
    get,
    getAll,
    deleteData,
    deleteDatabase,
  }
}

export default useIndexedDB
