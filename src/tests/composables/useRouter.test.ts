import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { useRouter } from '@/composables/useRouter'
import type { Router, RouterMap } from '@/types/link'

describe('useRouter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    globalThis._nSystemRouter = undefined
  })
  afterEach(() => {
    vi.useRealTimers()
    globalThis._nSystemRouter = undefined
  })

  it('updateDataでrouterMapとglobalThisが更新される', () => {
    const { routerMap, updateData } = useRouter()
    const routers: Router[] = [
      { id: '1', name: 'foo', path: '/foo', type: 'internal' },
      { id: '2', name: 'bar', path: '/bar', type: 'external' },
    ]
    updateData(routers)
    expect(routerMap.value.size).toBe(2)
    expect(globalThis._nSystemRouter?.size).toBe(2)
  })

  it('getByIdで正しいRouterが取得できる', () => {
    const { updateData, getById } = useRouter()
    const routers: Router[] = [{ id: '1', name: 'foo', path: '/foo', type: 'internal' }]
    updateData(routers)
    expect(getById('1')).toEqual({ id: '1', name: 'foo', path: '/foo', type: 'internal' })
    expect(getById('2')).toBeUndefined()
  })

  it('getByIdsで複数Routerが取得できる', () => {
    const { updateData, getByIds } = useRouter()
    const routers: Router[] = [
      { id: '1', name: 'foo', path: '/foo', type: 'internal' },
      { id: '2', name: 'bar', path: '/bar', type: 'external' },
    ]
    updateData(routers)
    expect(getByIds(['1', '2', '3'])).toEqual([
      { id: '1', name: 'foo', path: '/foo', type: 'internal' },
      { id: '2', name: 'bar', path: '/bar', type: 'external' },
    ])
  })

  it('pollGlobalRouterでglobalThis._nSystemRouterがセットされるとisReadyがtrueになる', () => {
    const routers: Router[] = [{ id: '1', name: 'foo', path: '/foo', type: 'internal' }]
    globalThis._nSystemRouter = new Map(routers.map((r) => [r.id, r])) as RouterMap
    const { isReady } = useRouter()
    vi.advanceTimersByTime(200)
    expect(isReady.value).toBe(true)
  })
})
