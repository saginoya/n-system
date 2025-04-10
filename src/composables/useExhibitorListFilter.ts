import { ref, computed } from 'vue'
import { useTextFormatter } from '@/utils'
import type { Ref } from 'vue'
import type { Exhibitor, Favorites } from '@/types/exhibitorList'

export const useExhibitorListFilter = (
  exhibitorList: Ref<Exhibitor[]>,
  favorites?: Ref<Favorites>,
) => {
  // モジュールの読み込み
  const { katakanaToHiragana } = useTextFormatter()

  // 状態管理
  // フィルターの条件（キーワード）
  const stateKeyword = ref<string>('')
  // フィルターの条件（展示会）
  const stateExhibition = ref<string[]>([])
  // フィルターの条件（お気に入り）
  const stateFavorite = ref<boolean>(false)

  // フィルター条件に一致する出展社の件数
  const numberOfVisibleExhibitors = computed<number>(() => {
    return exhibitorList.value.filter(validateExhibitor).length
  })

  // フィルターの条件（展示会）を設定する関数
  const setStateExhibition = (name: string, active: boolean) => {
    if (active) {
      if (stateExhibition.value.includes(name)) return
      stateExhibition.value.push(name)
    } else {
      if (!stateExhibition.value.includes(name)) return
      const index = stateExhibition.value.indexOf(name)
      stateExhibition.value.splice(index, 1)
    }
  }

  // 出展社を検索条件に一致するか検査する関数
  const validateExhibitor = (value: Exhibitor): boolean => {
    // お気に入りのみ表示のときにお気に入りでなければ早期リターン
    if (stateFavorite.value && favorites && !favorites.value.includes(value.id)) return false

    // 展示会の条件に一致しなければ早期リターン
    if (!stateExhibition.value.includes(value.exhibition)) return false

    // キーワードが設定されていなければ早期リターン
    if (!stateKeyword.value) return true

    // キーワードが含まれるかの検証
    const keyword = katakanaToHiragana(stateKeyword.value.toLowerCase())
    const subjects = [
      value.name,
      value.subName,
      value.koma,
      value.genre,
      value.contents,
      value.categories,
    ]
    const subject = katakanaToHiragana(subjects.join('・').toLowerCase())
    return subject.includes(keyword)
  }

  return {
    stateKeyword,
    stateExhibition,
    stateFavorite,
    numberOfVisibleExhibitors,
    setStateExhibition,
    validateExhibitor,
  }
}
