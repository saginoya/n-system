import { describe, it, expect } from 'vitest'

import { useStateSort } from '@/composables/exhibitors/useStateSort'

describe('useStateSort', () => {
  it('初期値がorderであること', () => {
    const { stateSort } = useStateSort()
    expect(stateSort.value).toBe('order')
  })

  it('ソートを更新できること', () => {
    const { updateStateSort, stateSort } = useStateSort()
    updateStateSort('koma')
    expect(stateSort.value).toBe('koma')
  })

  it('特定のソートに更新できること', () => {
    const { updateSortToKoma, updateSortToOrder, stateSort } = useStateSort()
    updateSortToKoma()
    expect(stateSort.value).toBe('koma')
    updateSortToOrder()
    expect(stateSort.value).toBe('order')
  })
})
