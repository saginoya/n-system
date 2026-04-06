import { describe, it, expect } from 'vitest'

import { useStateOverseas } from '@/composables/exhibitors/useStateOverseas'

describe('useStateOverseas', () => {
  it('初期値が両方含むセットであること', () => {
    const { stateOverseas, isAllStateOverseas } = useStateOverseas()
    expect(stateOverseas.value).toEqual(new Set(['overseas', 'domestic']))
    expect(isAllStateOverseas.value).toBe(true)
  })

  it('海外を追加・削除できること', () => {
    const { addStateOverseas, removeStateOverseas, isOverseasActive } = useStateOverseas()
    removeStateOverseas('overseas')
    expect(isOverseasActive.value).toBe(false)
    addStateOverseas('overseas')
    expect(isOverseasActive.value).toBe(true)
  })

  it('クリアできること', () => {
    const { removeStateOverseas, clearStateOverseas, isAllStateOverseas } = useStateOverseas()
    removeStateOverseas('overseas')
    clearStateOverseas()
    expect(isAllStateOverseas.value).toBe(true)
  })
})
