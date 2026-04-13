import { computed, type Ref } from 'vue'

import type { GenreID, Lang, Status } from '@/types'

type Options = {
  isJapanese: Ref<boolean>
  stateKeyword: Ref<string>
  removeStateKeyword: () => void
  stateGenres: Ref<Set<GenreID>>
  allGenreCount: Ref<number>
  removeStateGenres: (id: GenreID) => void
  clearStateGenres: () => void
  getGenreNameFromID: (value: GenreID, lang: Lang) => string | undefined
  isAllStateOverseas: Ref<boolean>
  isOverseasActive: Ref<boolean>
  isDomesticActive: Ref<boolean>
  clearStateOverseas: () => void
}

// ヘルパー関数: 現在の言語を取得
const getLang = (options: Options): Lang => (options.isJapanese.value ? 'ja' : 'en')

// キーワードステータスを生成
const createKeywordStatus = (options: Options): Status[] => {
  if (!options.stateKeyword.value) return []
  return [
    {
      name: options.stateKeyword.value,
      action: options.removeStateKeyword,
    },
  ]
}

// 海外・国内ステータスを生成
const createLocationStatus = (options: Options): Status[] => {
  // 両方選択されている場合
  if (options.isAllStateOverseas.value) return []

  if (options.isOverseasActive.value) {
    // 海外が選択されている場合
    return [
      {
        name: getLang(options) === 'ja' ? '海外' : 'Overseas',
        action: options.clearStateOverseas,
      },
    ]
  } else if (options.isDomesticActive.value) {
    // 国内が選択されている場合
    return [
      {
        name: getLang(options) === 'ja' ? '国内' : 'Japanese',
        action: options.clearStateOverseas,
      },
    ]
  } else {
    // どちらも選択されていない場合
    return [
      {
        name: getLang(options) === 'ja' ? '海外・国内が選択されていません' : 'No location selected',
        action: options.clearStateOverseas,
      },
    ]
  }
}

// ジャンルステータスを生成
const createGenreStatuses = (options: Options): Status[] => {
  const { stateGenres, allGenreCount } = options
  if (stateGenres.value.size >= allGenreCount.value) return []

  if (stateGenres.value.size === 0) {
    return [
      {
        name: getLang(options) === 'ja' ? 'エリアが1つも選択されていません' : 'No areas selected',
        action: options.clearStateGenres,
      },
    ]
  }

  return Array.from(stateGenres.value).map((genreID) => ({
    name: options.getGenreNameFromID(genreID, getLang(options)) ?? genreID,
    action: () => options.removeStateGenres(genreID),
  }))
}

export const useStatusDisplay = (options: Options) => {
  const statusList = computed<Status[]>(() => {
    const statusGenerators: ((options: Options) => Status[])[] = [
      createKeywordStatus,
      createLocationStatus,
      createGenreStatuses,
    ]

    return statusGenerators.flatMap((generator) => generator(options))
  })

  return {
    statusList,
  }
}
