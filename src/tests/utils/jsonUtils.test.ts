import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import {
  getJson,
  parseJson,
  stringifyJson,
  validateJson,
  getJsonWithCache,
} from '../../utils/jsonUtils'

import type { Mock } from 'vitest'

const global = globalThis as typeof globalThis & { fetch: Mock }

describe('getJson', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('正常にJSONを取得できる', async () => {
    const mockData = { test: 'data' }
    ;(global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const result = await getJson('https://example.com/data.json')
    expect(result).toEqual(mockData)
  })

  it('HTTPエラーの場合は例外をスローする', async () => {
    ;(global.fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    await expect(getJson('https://example.com/data.json')).rejects.toThrow(
      'HTTP error! status: 404',
    )
  })

  it('フェッチに失敗した場合は例外をスローする', async () => {
    ;(global.fetch as Mock).mockRejectedValueOnce(new Error('Network error'))

    await expect(getJson('https://example.com/data.json')).rejects.toThrow('Network error')
  })
})

describe('parseJson', () => {
  it('正常にJSONをパースできる', () => {
    const jsonString = '{"test":"data"}'
    const result = parseJson(jsonString)
    expect(result).toEqual({ test: 'data' })
  })

  it('無効なJSONの場合は例外をスローする', () => {
    const invalidJson = '{test:data}'
    expect(() => parseJson(invalidJson)).toThrow()
  })
})

describe('stringifyJson', () => {
  it('正常にJSON文字列に変換できる', () => {
    const data = { test: 'data' }
    const result = stringifyJson(data)
    expect(result).toBe('{\n  "test": "data"\n}')
  })

  it('循環参照の場合は例外をスローする', () => {
    const circular: Record<string, unknown> = { test: 'data' }
    circular.self = circular

    expect(() => stringifyJson(circular)).toThrow()
  })
})

describe('validateJson', () => {
  it('スキーマに一致するデータはtrueを返す', () => {
    const data = { name: 'test', age: 20 }
    const schema = { name: '', age: 0 }

    expect(validateJson(data, schema)).toBe(true)
  })

  it('スキーマに一致しないデータはfalseを返す', () => {
    const data = { name: 'test', age: '20' }
    const schema = { name: '', age: 0 }

    expect(validateJson(data, schema)).toBe(false)
  })

  it('スキーマにないプロパティは無視される', () => {
    const data = { name: 'test', age: 20, extra: 'data' }
    const schema = { name: '', age: 0 }

    expect(validateJson(data, schema)).toBe(true)
  })
})

describe('getJsonWithCache', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('キャッシュがない場合は新規取得する', async () => {
    const mockData = { test: 'data' }
    ;(global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const result = await getJsonWithCache('https://example.com/data.json')
    expect(result).toEqual(mockData)
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  it('キャッシュが有効な場合はキャッシュを返す', async () => {
    const mockData = { test: 'data' }
    const cacheData = {
      data: mockData,
      timestamp: Date.now(),
    }
    localStorage.setItem('json_cache_https://example.com/data.json', JSON.stringify(cacheData))

    const result = await getJsonWithCache('https://example.com/data.json')
    expect(result).toEqual(mockData)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('キャッシュが期限切れの場合は新規取得する', async () => {
    const mockData = { test: 'data' }
    const cacheData = {
      data: mockData,
      timestamp: Date.now() - 6 * 60 * 1000, // 6分前
    }
    localStorage.setItem('json_cache_https://example.com/data.json', JSON.stringify(cacheData))
    ;(global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const result = await getJsonWithCache('https://example.com/data.json')
    expect(result).toEqual(mockData)
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})
