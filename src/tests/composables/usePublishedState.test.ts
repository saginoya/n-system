import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'

import { usePublishedState } from '@/composables/usePublishedState'

describe('usePublishedState', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('初期状態が正しい', () => {
    const state = usePublishedState()
    expect(state.publishedState.value).toBe('default')
    expect(state.isPreparation.value).toBe(false)
    expect(state.isExpiration.value).toBe(false)
    expect(state.isClosing.value).toBe(false)
  })

  it('setPublishedStateで状態が変わる', () => {
    const state = usePublishedState()
    state.setPublishedState('preparation')
    expect(state.publishedState.value).toBe('preparation')
    expect(state.isPreparation.value).toBe(true)
  })

  it('setDeadlineで期限を設定できる', () => {
    const state = usePublishedState()
    const result = state.setDeadline('2099-12-31T23:59:59')
    expect(result).toBe(true)
    expect(state.isExpiration.value).toBe(false)
  })

  it('setDeadlineで不正な日付はfalseを返す', () => {
    const state = usePublishedState()
    const result = state.setDeadline('invalid-date')
    expect(result).toBe(false)
  })

  it('期限切れになると自動でclosingになる', async () => {
    const state = usePublishedState()
    state.setDeadline(new Date(Date.now() + 1000)) // 1秒後に期限
    state.setPublishedState('default')
    vi.advanceTimersByTime(180000) // 3分進める
    state.updateNow() // 現在の日時を更新
    await nextTick()
    expect(state.isExpiration.value).toBe(true)
    expect(state.publishedState.value).toBe('closing')
  })

  it('revokeAutoDeadlineで自動期限切れが無効化される', async () => {
    const state = usePublishedState()
    state.setDeadline(new Date(Date.now() + 1000))
    state.revokeAutoDeadline()
    vi.advanceTimersByTime(180000)
    state.updateNow()
    await nextTick()
    expect(state.publishedState.value).not.toBe('closing')
  })

  it('deadline未設定時はintervalが動かない', () => {
    const state = usePublishedState()
    expect(state.intervalId.value).toBeNull()
  })

  it('期限切れ時はintervalがクリアされる', async () => {
    const state = usePublishedState()
    state.setDeadline(new Date(Date.now() + 1000))
    vi.advanceTimersByTime(180000)
    state.updateNow()
    await nextTick()
    expect(state.intervalId.value).toBeNull()
  })
})
