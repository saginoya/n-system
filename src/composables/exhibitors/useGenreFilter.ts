import { ref, computed, watch } from 'vue'

import type { Lang, Color, Genre, GenreID, Exhibition, ExhibitionID } from '@/types'

import type { Ref, ComputedRef } from 'vue'

// ReadonlyなRef型を定義
type ReadonlyRef<T> = {
  readonly value: T
}

/**
 * ジャンルフィルターの高レベルロジック管理を行うComposable
 *
 * 役割: UI向けの複雑なフィルターロジックと表示制御
 * - Record<GenreID, boolean> で各ジャンルのオンオフ状態を管理
 * - genresMapとの連携で初期化と同期
 * - exhibitionOptionsなどのUI向けcomputed生成
 * - 親コンポーネントとの状態同期（updateStateGenres）
 * - 展示会オプションやフィルター判定などのビジネスロジックを含む
 */
export const useGenreFilter = (
  exhibitions: Ref<Exhibition[] | undefined>,
  genresMap: ReadonlyRef<Record<GenreID, Genre>>,
  stateGenres: Ref<Set<GenreID>>,
  updateStateGenres: (genres: GenreID[]) => void,
  lang: Lang,
) => {
  const genreFlags = ref<Record<GenreID, boolean>>({})

  // ジャンルフラグの初期化関数
  const initGenreFlags = (keys: GenreID[]) => {
    keys.forEach((key) => {
      genreFlags.value[key] = true
    })
  }

  const syncGenreFlagsFromStateGenres = (genres: Set<GenreID> | undefined) => {
    if (!genresMap.value) return

    const keys = Object.keys(genresMap.value) as GenreID[]
    if (keys.length === 0) return

    const isAllSelected = !genres || genres.size === 0
    keys.forEach((key) => {
      genreFlags.value[key] = isAllSelected ? true : genres.has(key)
    })
  }

  // 指定されたジャンルIDのフラグがすべてtrueかの判定
  const isTrueGenreFlags = (keys: string[]): boolean => {
    return keys.every((key) => !!genreFlags.value[key])
  }

  // ジャンルフラグの更新関数
  const updateGenreFlags = (keys: string[], value: boolean): void => {
    keys.forEach((key) => {
      genreFlags.value[key] = value
    })
  }

  // ジャンルフラグをすべてtrueにする関数
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

  // 展示会オプションのcomputedプロパティ
  const exhibitionOptions = computed<ExhibitionOptions[]>(() => {
    const list = exhibitions.value
    if (!list) return []
    return list.map((exhibition) => convertToExhibitionOptions(exhibition, lang))
  })

  // ジャンルのMapが更新されたら外部のstateGenresを元に同期
  watch(
    genresMap,
    () => {
      if (!genresMap.value) return
      syncGenreFlagsFromStateGenres(stateGenres.value)
    },
    { immediate: true },
  )

  // 外部のstateGenresが変更されたら内部のgenreFlagsを同期
  watch(
    stateGenres,
    (newSet) => {
      if (!genresMap.value) return
      const keys = Object.keys(genresMap.value) as GenreID[]
      const shouldSync = keys.some((key) => {
        const nextValue = newSet.size === 0 ? true : newSet.has(key)
        return genreFlags.value[key] !== nextValue
      })
      if (!shouldSync) return
      syncGenreFlagsFromStateGenres(newSet)
    },
    { deep: true },
  )

  // ジャンルの状態が更新されたら親コンポーネントの状態を更新
  watch(
    genreFlags,
    () => {
      if (!genresMap.value) return
      const newValues: GenreID[] = []
      for (const key in genreFlags.value) {
        if (genreFlags.value[key]) {
          newValues.push(genresMap.value[key]!['id'])
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
