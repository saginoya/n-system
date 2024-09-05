import { ref, computed } from 'vue'
import { useText } from '@/utils/useText'
import type { Ref } from 'vue'
import type { Exhibitor } from '@/types/exhibitorList'

export const useExhibitorListFilter = (exhibitorList: Ref<Exhibitor[]>) => {
  // モジュールの読み込み
  const { katakanaToHiragana } = useText()

  // 状態管理
  // フィルターの条件（キーワード）
  const stateKeyword = ref<string>('')
  // フィルターの条件（展示会）
  const stateExhibition = ref<string[]>([])

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
    if (!stateExhibition.value.includes(value.exhibition)) return false
    if (!stateKeyword.value) return true

    const keyword = katakanaToHiragana(stateKeyword.value.toLowerCase())
    const subjects = [
      value.name,
      value.subName,
      value.koma,
      value.genre,
      value.contents,
      value.categories
    ]
    const subject = katakanaToHiragana(subjects.join('・').toLowerCase())

    return subject.includes(keyword)
  }

  return {
    stateKeyword,
    stateExhibition,
    numberOfVisibleExhibitors,
    setStateExhibition,
    validateExhibitor
  }
}
