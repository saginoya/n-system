import { ref } from 'vue'

import type { GenreID } from '@/types'

/**
 * 検索フィルターの状態管理を行うComposable
 */
export const useStateGenres = () => {
  const stateGenres = ref<GenreID[]>([])

  // ジャンルの更新関数
  const updateStateGenres = (values: GenreID[]): void => {
    stateGenres.value = values
  }
  // ジャンルの更新関数（追加）
  const addStateGenres = (value: GenreID): void => {
    if (!stateGenres.value.includes(value)) {
      stateGenres.value.push(value)
    }
  }
  // ジャンルの更新関数（削除）
  const removeStateGenres = (value: GenreID): void => {
    stateGenres.value = stateGenres.value.filter((genre) => genre !== value)
  }

  return {
    stateGenres,
    updateStateGenres,
    addStateGenres,
    removeStateGenres,
  }
}
