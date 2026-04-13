import { ref, watch, type Ref } from 'vue'

import type { GenreID } from '@/types'

/**
 * ジャンル選択状態の低レベル管理を行うComposable
 *
 * 役割: 選択されたジャンルIDのSetを管理する基本的な状態管理
 * - Set<GenreID> で選択状態を保持
 * - 他のフィルター機能でも再利用可能な汎用的な状態管理
 * - UIロジックやビジネスロジックを含まない
 */
export const useStateGenres = (initValues: Ref<GenreID[]>) => {
  const stateGenres = ref<Set<GenreID>>(new Set(initValues.value))

  // ジャンルの更新関数
  const updateStateGenres = (values: GenreID[]): void => {
    stateGenres.value = new Set(values)
  }
  // ジャンルの更新関数（追加）
  const addStateGenres = (value: GenreID): void => {
    stateGenres.value.add(value)
  }
  // ジャンルの更新関数（削除）
  const removeStateGenres = (value: GenreID): void => {
    stateGenres.value.delete(value)
  }

  // 初期値にリセットする関数
  const clearStateGenres = (): void => {
    stateGenres.value = new Set(initValues.value)
  }

  // 初期値の変更を監視してstateGenresを更新
  watch(initValues, (newValues) => {
    stateGenres.value = new Set(newValues)
  })

  return {
    stateGenres,
    updateStateGenres,
    addStateGenres,
    removeStateGenres,
    clearStateGenres,
  }
}
