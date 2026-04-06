import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useFavorites } from '@/composables/exhibitors/useFavorites'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

// Mock window.confirm
const mockConfirm = vi.fn()
Object.defineProperty(window, 'confirm', {
  value: mockConfirm,
})

// Mock localStorageManager
vi.mock('@/lib/localStorage', () => ({
  localStorageManager: vi.fn((key) => ({
    get: () => mockLocalStorage.getItem(key),
    set: (value: string) => mockLocalStorage.setItem(key, value),
  })),
}))

describe('useFavorites', () => {
  const mockKey = 'test-favorites'
  const mockLang = 'ja' as const

  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
    mockConfirm.mockReturnValue(true)
  })

  it('初期状態が正しいこと', () => {
    const { myFavorites, numMyFavorites } = useFavorites(mockKey, mockLang)

    expect(myFavorites.value).toEqual([])
    expect(numMyFavorites.value).toBe(0)
  })

  it('お気に入りを追加できること', () => {
    const { setFavorite, myFavorites, numMyFavorites } = useFavorites(mockKey, mockLang)

    setFavorite('1')

    expect(myFavorites.value).toEqual(['1'])
    expect(numMyFavorites.value).toBe(1)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-favorites', '["1"]')
  })

  it('お気に入りを削除できること', () => {
    const { setFavorite, removeFavorite, myFavorites } = useFavorites(mockKey, mockLang)

    setFavorite('1')
    removeFavorite('1')

    expect(myFavorites.value).toEqual([])
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-favorites', '[]')
  })

  it('お気に入りに含まれているかチェックできること', () => {
    const { setFavorite, includedFavorites } = useFavorites(mockKey, mockLang)

    setFavorite('1')

    expect(includedFavorites('1')).toBe(true)
    expect(includedFavorites('2')).toBe(false)
  })
})
