import { ref, watch } from 'vue'

import type { GenreID, Genre } from '@/types'

// ReadonlyなRef型を定義
type ReadonlyRef<T> = {
  readonly value: T
}

/**
 * ジャンルフィルターの状態管理を行うComposable
 * - `genresMap` ジャンルのMapデータ
 * - `updateStateGenres` 親コンポーネントのジャンル状態更新関数
 */
export const useGenreFilter = (
  genresMap: ReadonlyRef<Record<GenreID, Genre>>,
  updateStateGenres: (genres: string[]) => void,
) => {
  const genreFlags = ref<Record<GenreID, boolean>>({})

  const initGenreFlags = (keys: GenreID[]) => {
    keys.forEach((key) => {
      genreFlags.value[key] = true
    })
  }

  const isTrueGenreFlags = (keys: string[]): boolean => {
    return keys.every((key) => !!genreFlags.value[key])
  }

  const updateGenreFlags = (keys: string[], value: boolean): void => {
    keys.forEach((key) => {
      genreFlags.value[key] = value
    })
  }

  const removeGenreFlags = (): void => {
    Object.keys(genreFlags.value).forEach((key) => {
      genreFlags.value[key as GenreID] = true
    })
  }

  // ジャンルのMapが更新されたら初期化
  watch(
    genresMap,
    (m) => {
      if (!m) return
      initGenreFlags(Object.keys(m) as GenreID[])
    },
    { immediate: true },
  )

  // ジャンルの状態が更新されたら親コンポーネントの状態を更新
  watch(
    genreFlags,
    () => {
      if (!genresMap.value) return
      const newValues: string[] = []
      for (const key in genreFlags.value) {
        if (genreFlags.value[key]) {
          newValues.push(genresMap.value[key]['id'])
        }
      }
      updateStateGenres(newValues)
    },
    { deep: true },
  )

  return {
    genreFlags,
    initGenreFlags,
    isTrueGenreFlags,
    updateGenreFlags,
    removeGenreFlags,
  }
}
