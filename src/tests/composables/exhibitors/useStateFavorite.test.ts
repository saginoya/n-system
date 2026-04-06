import { describe, it, expect } from 'vitest'

import { useStateFavorite } from '@/composables/exhibitors/useStateFavorite'

describe('useStateFavorite', () => {
  it('初期値がfalseであること', () => {
    const { stateFavorite } = useStateFavorite()
    expect(stateFavorite.value).toBe(false)
  })
})
