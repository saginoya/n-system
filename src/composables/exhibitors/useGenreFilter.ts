import { computed } from 'vue'

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
  const getAllGenreIDs = (): GenreID[] => {
    if (!genresMap.value) return []
    return Object.keys(genresMap.value) as GenreID[]
  }

  const isGenreOn = (genreID: GenreID): boolean => {
    // stateGenresが空の初期状態は「すべて選択」と同義なのでtrue扱い
    if (stateGenres.value.size === 0) return true
    return stateGenres.value.has(genreID)
  }

  const commitSelected = (selected: Set<GenreID>) => {
    const all = getAllGenreIDs()
    // 「全選択」は Set を空で表現する
    if (all.length > 0 && selected.size === all.length) {
      updateStateGenres([])
      return
    }
    updateStateGenres(Array.from(selected))
  }

  const setGenreOn = (genreID: GenreID, value: boolean) => {
    const all = getAllGenreIDs()
    const current =
      stateGenres.value.size === 0 ? new Set<GenreID>(all) : new Set<GenreID>(stateGenres.value)

    if (value) {
      current.add(genreID)
    } else {
      current.delete(genreID)
    }
    commitSelected(current)
  }

  // ジャンルフラグの更新関数（展示会単位など）
  const updateGenreFlags = (keys: readonly GenreID[], value: boolean): void => {
    const all = getAllGenreIDs()
    const current =
      stateGenres.value.size === 0 ? new Set<GenreID>(all) : new Set<GenreID>(stateGenres.value)

    keys.forEach((key) => {
      if (value) current.add(key)
      else current.delete(key)
    })
    commitSelected(current)
  }

  // 絞り込みが行われているかの判定
  const isFilteringByGenre = computed<boolean>(() => {
    const all = getAllGenreIDs()
    // stateGenres が空なら「全選択」扱いで絞り込みなし
    if (stateGenres.value.size === 0) return false
    return all.length > 0 && stateGenres.value.size < all.length
  })

  // 互換性/デバッグ用途: flags は状態ではなく導出値として提供
  const genreFlags = computed<Record<GenreID, boolean>>(() => {
    const all = getAllGenreIDs()
    const next: Record<GenreID, boolean> = {} as Record<GenreID, boolean>
    all.forEach((id) => (next[id] = isGenreOn(id)))
    return next
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
    const isOn = computed(() => exhibition.genres.every((id) => isGenreOn(id)))

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

  return {
    // 互換性/デバッグ用途（UIは基本 isGenreOn/setGenreOn を使用）
    genreFlags,
    isFilteringByGenre,
    isGenreOn,
    setGenreOn,
    updateGenreFlags,
    exhibitionOptions,
  }
}
