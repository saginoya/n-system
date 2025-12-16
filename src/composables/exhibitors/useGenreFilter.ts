import { ref, computed, watch } from 'vue'

import type { Lang, Color, Genre, GenreID, Exhibition, ExhibitionID } from '@/types'

import type { Ref, ComputedRef } from 'vue'

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
  exhibitions: Ref<Exhibition[] | undefined>,
  genresMap: ReadonlyRef<Record<GenreID, Genre>>,
  updateStateGenres: (genres: string[]) => void,
  lang: Lang,
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

  // 絞り込みが行われているかの判定
  const isFilteringByGenre = computed<boolean>(() => {
    return !Object.values(genreFlags.value).every(Boolean)
  })

  // 展示会・エリアごとのジャンルの絞り込み条件のためのオブジェクト配列
  type ExhibitionOptions = {
    id: ExhibitionID
    label: string
    color: Color
    genres: GenreID[]
    isOn: ComputedRef<boolean>
  }

  // 展示会情報を元にオプションオブジェクトを生成
  const convertToExhibitionOptions = (exhibition: Exhibition, lang: Lang): ExhibitionOptions => {
    const { id, color, genres } = exhibition
    const label =
      lang === 'ja'
        ? `${exhibition['name']}のすべてのエリア`
        : `All Areas of ${exhibition['nameEng']}`
    const isOn = computed(() => isTrueGenreFlags(exhibition.genres))

    return {
      id,
      label,
      color,
      genres,
      isOn,
    }
  }

  const exhibitionOptions = computed<ExhibitionOptions[]>(() => {
    const list = exhibitions.value
    if (!list) return []
    return list.map((exhibition) => convertToExhibitionOptions(exhibition, lang))
  })

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
    isFilteringByGenre,
    exhibitionOptions,
  }
}
