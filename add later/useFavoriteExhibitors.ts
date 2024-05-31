import { ref } from 'vue'
import { useLocalstrage } from '@/utils/useLocalstorage'

export const useFavoriteExhibitors = () => {
  type Value = string

  // ローカルストレージのキー名
  const key = 'nexpo_favorites'

  // ローカルストレージを利用する関数
  const { set, get } = useLocalstrage(key)

  // お気に入りリスト
  const myFavorites = ref<string[]>([])

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
  const removeFavorite = (value: Value) => {
    if (window.confirm('お気に入り登録から解除しますか？')) {
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

  return {
    myFavorites,
    getFavoriteItems,
    setFavorite,
    removeFavorite,
    switchFavorite
  }
}
