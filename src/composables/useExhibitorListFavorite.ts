import { ref, onMounted } from 'vue'
import { useLocalStorage } from '@/utils/useLocalStorage'
import { useLang } from '@/composables/useLang'
import type { Favorites } from '@/types/exhibitorList'

export const useExhibitorListFavorite = (key: string) => {
  type Value = string

  const { lang } = useLang()

  // ローカルストレージを利用する関数
  const { set, get } = useLocalStorage(key)

  // お気に入りリスト
  const myFavorites = ref<Favorites>([])

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
  const msgRemove = {
    ja: 'お気に入り登録から解除しますか？',
    en: 'Do you want to unsubscribe from your favorites?',
  }
  const removeFavorite = (value: Value) => {
    if (window.confirm(msgRemove[lang.value])) {
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
    switchFavorite,
  }
}
