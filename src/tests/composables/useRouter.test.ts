import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { useRouter } from '@/composables/useRouter'
import type { Router, RouterMap } from '@/types'

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
      { id: '1', name: 'foo', type: 'internal', href: '/foo' },
      { id: '2', name: 'bar', type: 'image', src: '/bar.jpg' },
    ]
    updateData(routers)
    expect(routerMap.value.size).toBe(2)
    expect(globalThis._nSystemRouter?.size).toBe(2)
  })

  it('getByIdで正しいRouterが取得できる', () => {
    const { updateData, getById } = useRouter()
    const routers: Router[] = [{ id: '1', name: 'foo', type: 'internal', href: '/foo' }]
    updateData(routers)
    expect(getById('1')).toEqual({ id: '1', name: 'foo', type: 'internal', href: '/foo' })
    expect(getById('2')).toBeUndefined()
  })

  it('getLinkByIdでリンク型のRouterのみ取得できる', () => {
    const { updateData, getLinkById } = useRouter()
    const routers: Router[] = [
      { id: '1', name: 'foo', type: 'internal', href: '/foo' },
      { id: '2', name: 'bar', type: 'image', src: '/bar.jpg' },
    ]
    updateData(routers)
    expect(getLinkById('1')).toEqual({ id: '1', name: 'foo', type: 'internal', href: '/foo' })
    expect(getLinkById('2')).toBeUndefined()
  })

  it('getImageByIdで画像型のRouterのみ取得できる', () => {
    const { updateData, getImageById } = useRouter()
    const routers: Router[] = [
      { id: '1', name: 'foo', type: 'internal', href: '/foo' },
      { id: '2', name: 'bar', type: 'image', src: '/bar.jpg' },
    ]
    updateData(routers)
    expect(getImageById('2')).toEqual({ id: '2', name: 'bar', type: 'image', src: '/bar.jpg' })
    expect(getImageById('1')).toBeUndefined()
  })

  it('getByIdsで複数Routerが取得できる', () => {
    const { updateData, getByIds } = useRouter()
    const routers: Router[] = [
      { id: '1', name: 'foo', type: 'internal', href: '/foo' },
      { id: '2', name: 'bar', type: 'image', src: '/bar.jpg' },
    ]
    updateData(routers)
    expect(getByIds(['1', '2', '3'])).toEqual([
      { id: '1', name: 'foo', type: 'internal', href: '/foo' },
      { id: '2', name: 'bar', type: 'image', src: '/bar.jpg' },
    ])
  })

  it('pollGlobalRouterでglobalThis._nSystemRouterがセットされるとisReadyがtrueになる', () => {
    const routers: Router[] = [{ id: '1', name: 'foo', type: 'internal', href: '/foo' }]
    globalThis._nSystemRouter = new Map(routers.map((r) => [r.id, r])) as RouterMap
    const { isReady } = useRouter()
    vi.advanceTimersByTime(200)
    expect(isReady.value).toBe(true)
  })
})
