import { describe, it, expect } from 'vitest'

import { useStateKeyword } from '@/composables/exhibitors/useStateKeyword'

describe('useStateKeyword', () => {
  it('初期値が空文字列であること', () => {
    const { stateKeyword } = useStateKeyword()
    expect(stateKeyword.value).toBe('')
  })

  it('キーワードを更新できること', () => {
    const { updateStateKeyword, stateKeyword } = useStateKeyword()
    updateStateKeyword('test')
    expect(stateKeyword.value).toBe('test')
  })

  it('キーワードを削除できること', () => {
    const { updateStateKeyword, removeStateKeyword, stateKeyword } = useStateKeyword()
    updateStateKeyword('test')
    removeStateKeyword()
    expect(stateKeyword.value).toBe('')
  })
})
