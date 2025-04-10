import { computed } from 'vue'
import { useTextFormatter } from '@/utils'
import type { Ref } from 'vue'
import type { Lang, SortType, Exhibitor } from '@/types'

export const useExhibitorListHeading = (
  exhibitorList: Ref<Exhibitor[]>,
  sort: Ref<SortType>,
  lang: Lang,
  filterFunc: (value: Exhibitor) => boolean,
) => {
  const { isSingleByteChara } = useTextFormatter()

  // 見出しの一覧
  const headings = computed<string[]>(() => {
    // 見出しを比較する変数のリセット
    currentHeading = ''

    // 出展社リストから見出しのリストを生成する
    return exhibitorList.value.map((exhibitor) => {
      if (filterFunc(exhibitor)) {
        return showHeading(exhibitor.genre || '', exhibitor.order)
      } else {
        return ''
      }
    })
  })

  // 前の見出しと比較して一致するば値を返す
  let currentHeading: string = ''
  const showHeading = (genre: string, order: string): string => {
    const value: string = generateHeading(genre, order)
    if (currentHeading === value) {
      return ''
    } else {
      currentHeading = value
      return value
    }
  }

  // 値から見出しの文字を生成
  const generateHeading = (genre: string, order: string) => {
    if (sort.value === 'koma') {
      return genre
    } else if (isOverseas(order.slice(0, 1))) {
      return '海外'
    } else {
      return order.slice(0, 1)
    }
  }

  // 海外の出展社かの判定（日本語限定）
  const isOverseas = (order: string): boolean | undefined => {
    if (lang !== 'ja') return undefined
    return isSingleByteChara(order)
  }

  return {
    headings,
  }
}
