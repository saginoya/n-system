import { describe, it, expect } from 'vitest'

import { useStateGenres } from '@/composables/exhibitors/useStateGenres'

describe('useStateGenres', () => {
  it('初期値が空配列であること', () => {
    const { stateGenres } = useStateGenres()
    expect(stateGenres.value).toEqual([])
  })

  it('ジャンルを追加できること', () => {
    const { addStateGenres, stateGenres } = useStateGenres()
    addStateGenres('genre1')
    expect(stateGenres.value).toEqual(['genre1'])
  })

  it('ジャンルを削除できること', () => {
    const { addStateGenres, removeStateGenres, stateGenres } = useStateGenres()
    addStateGenres('genre1')
    removeStateGenres('genre1')
    expect(stateGenres.value).toEqual([])
  })
})
