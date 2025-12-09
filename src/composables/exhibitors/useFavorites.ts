import { ref, computed, onMounted } from 'vue'

import { localStorageManager } from '@/lib/localStorage'
import type { Favorites, ExhibitorID, Lang } from '@/types'

export const useFavorites = (key: string, lang: Lang) => {
  type Value = string

  // ローカルストレージを利用する関数
  const { set, get } = localStorageManager(key)

  // お気に入りリスト
  const myFavorites = ref<Favorites>([])

  // お気に入りリストの件数
  const numMyFavorites = computed<number>(() => {
    return myFavorites.value.length
  })

  // ロード時にローカルストレージから初期値をセット
  onMounted(() => {
    getFavoriteItems()
  })

  // お気に入りリストを取得
  const getFavoriteItems = () => {
    const data = get()
    if (data) {
      myFavorites.value = JSON.parse(data)
    }
  }

  // お気に入りリストに追加
  const setFavorite = (value: Value) => {
    myFavorites.value.push(value)
    const arr = JSON.stringify(myFavorites.value)
    set(arr)
  }

  // お気に入りリストから削除
  // あとで別のモジュールへ切り分ける可能性あり
  const msgRemove = {
    ja: 'お気に入り登録から解除しますか？',
    en: 'Do you want to unsubscribe from your favorites?',
  }
  const removeFavorite = (value: Value) => {
    if (window.confirm(msgRemove[lang])) {
      const index = myFavorites.value.indexOf(value)
      myFavorites.value.splice(index, 1)
      const arr = JSON.stringify(myFavorites.value)
      set(arr)
    }
  }

  // 追加と削除を条件により切り替えて実行
  const switchFavorite = (value: Value) => {
    if (!myFavorites.value.includes(value)) {
      setFavorite(value)
    } else {
      removeFavorite(value)
    }
  }

  // お気に入りリストに含まれているか検査
  const includedFavorites = (id: ExhibitorID): boolean => {
    return myFavorites.value.includes(id)
  }

  return {
    myFavorites,
    numMyFavorites,
    getFavoriteItems,
    setFavorite,
    removeFavorite,
    switchFavorite,
    includedFavorites,
  }
}
