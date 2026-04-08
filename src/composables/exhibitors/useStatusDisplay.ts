import { computed, type Ref } from 'vue'

import type { Lang, Status, GenreID } from 'src/types'

type Options = {
  isJapanese: Ref<boolean>
  stateKeyword: Ref<string>
  removeStateKeyword: () => void
  stateGenres: Ref<Set<string>>
  allGenreCount: Ref<number>
  removeStateGenres: (id: string) => void
  getGenreNameFromID: (value: GenreID, lang: Lang) => string | undefined
  isAllStateOverseas: Ref<boolean>
  isOverseasActive: Ref<boolean>
  isDomesticActive: Ref<boolean>
  clearStateOverseas: () => void
}

export const useStatusDisplay = (options: Options) => {
  const statusList = computed<Status[]>(() => {
    const list: Status[] = []

    if (options.stateKeyword.value) {
      list.push({
        name: options.stateKeyword.value,
        action: options.removeStateKeyword,
      })
    }

    if (!options.isAllStateOverseas.value && options.isOverseasActive.value) {
      list.push({
        name: options.isJapanese ? '海外' : 'Overseas',
        action: options.clearStateOverseas,
      })
    }

    if (!options.isAllStateOverseas.value && options.isDomesticActive.value) {
      list.push({
        name: options.isJapanese ? '国内' : 'Japanese',
        action: options.clearStateOverseas,
      })
    }

    if (
      options.stateGenres.value.size > 0 &&
      options.stateGenres.value.size < options.allGenreCount.value
    ) {
      for (const genreID of options.stateGenres.value) {
        list.push({
          name:
            options.getGenreNameFromID(
              genreID as GenreID,
              options.isJapanese.value ? 'ja' : 'en',
            ) ?? genreID,
          action: () => options.removeStateGenres(genreID as string),
        })
      }
    }

    return list
  })

  return {
    statusList,
  }
}
