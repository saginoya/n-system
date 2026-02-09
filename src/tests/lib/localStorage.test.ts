import { describe, it, expect, beforeEach, vi } from 'vitest'

import { localStorageManager } from '@/lib/localStorage'

describe('localStorageUtils', () => {
  const mockLocalStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  }

  beforeEach(() => {
    // localStorageのモックを設定
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    })
    // 各メソッドのモックをクリア
    mockLocalStorage.setItem.mockClear()
    mockLocalStorage.getItem.mockClear()
    mockLocalStorage.removeItem.mockClear()
  })

  describe('localStorageManager', () => {
    const key = 'test_key'
    const value = 'test_value'
    const storage = localStorageManager(key)

    it('正常系: 値の保存ができる', () => {
      storage.set(value)
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(key, value)
    })

    it('正常系: 値の取得ができる', () => {
      mockLocalStorage.getItem.mockReturnValue(value)
      const result = storage.get()
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key)
      expect(result).toBe(value)
    })

    it('正常系: 値の削除ができる', () => {
      storage.remove()
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(key)
    })

    it('エラー系: 値の保存に失敗した場合', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error')
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      storage.set(value)
      expect(consoleErrorSpy).toHaveBeenCalled()
      expect(consoleErrorSpy.mock.calls[0]![0]).toContain('localStorageの保存に失敗しました')
    })

    it('エラー系: 値の取得に失敗した場合', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error')
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      const result = storage.get()
      expect(consoleErrorSpy).toHaveBeenCalled()
      const lastCall =
        consoleErrorSpy.mock.calls[consoleErrorSpy.mock.calls.length - 1]
      expect(lastCall![0]).toContain('localStorageの取得に失敗しました')
      expect(result).toBeNull()
    })

    it('エラー系: 値の削除に失敗した場合', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error')
      mockLocalStorage.removeItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      storage.remove()
      expect(consoleErrorSpy).toHaveBeenCalled()
      const lastCall =
        consoleErrorSpy.mock.calls[consoleErrorSpy.mock.calls.length - 1]
      expect(lastCall![0]).toContain('localStorageの削除に失敗しました')
    })

    it('localStorageが利用できない場合', () => {
      // localStorageを利用不可に設定
      Object.defineProperty(window, 'localStorage', {
        value: null,
        writable: true,
      })

      const consoleWarnSpy = vi.spyOn(console, 'warn')
      const storage = localStorageManager(key)

      // 各メソッドがエラーを投げないことを確認
      expect(() => storage.set(value)).not.toThrow()
      expect(() => storage.get()).not.toThrow()
      expect(() => storage.remove()).not.toThrow()

      // 警告が表示されることを確認
      expect(consoleWarnSpy).toHaveBeenCalledWith('localStorageが利用できません')
    })
  })
})
