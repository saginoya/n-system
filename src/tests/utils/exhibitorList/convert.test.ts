import { describe, it, expect } from 'vitest'

import type { JsonExhibitor } from '@/types'
import { applyExhibitor, convertJSONToExhibitorList, toBoothNumber } from '@/utils/exhibitorList/'

describe('convert.ts', () => {
  describe('toBoothNumber', () => {
    it('日本語では小間番号を変換しない', () => {
      expect(toBoothNumber('A-1', true)).toBe('A-1')
      expect(toBoothNumber('外-1', true)).toBe('外-1')
    })

    it('英語では"外"を"Z"に置換する', () => {
      expect(toBoothNumber('外-1', false)).toBe('Z-1')
      expect(toBoothNumber('A-1', false)).toBe('A-1')
    })
  })

  describe('applyExhibitor', () => {
    const mockJsonExhibitor: JsonExhibitor = {
      id: '1',
      name: 'テスト会社',
      nameEng: 'Test Company',
      order: 'テスト',
      orderEng: 'Test',
      koma: '外-1',
      exhibition: 'exhibition1',
      genre: 'genre1',
      overseas: false,
      country: '日本',
      countryEng: 'Japan',
      webSite: 'https://example.com',
      contents: '内容',
      contentsEng: 'Content',
      sdgs: [1, 2, 3],
    }

    it('JsonExhibitorをExhibitorに変換（日本語）', () => {
      const result = applyExhibitor(mockJsonExhibitor, 'ja')
      expect(result.id).toBe('1')
      expect(result.name).toBe('テスト会社')
      expect(result.subName).toBe('Test Company')
      expect(result.order).toBe('テスト')
      expect(result.koma).toBe('外-1')
      expect(result.exhibition).toBe('exhibition1')
      expect(result.genre).toBe('genre1')
      expect(result.overseas).toBe(false)
      expect(result.country).toBe('日本')
      expect(result.webSite).toBe('https://example.com')
      expect(result.contents).toBe('内容')
      expect(result.sdgs).toEqual([1, 2, 3])
    })

    it('JsonExhibitorをExhibitorに変換（英語）', () => {
      const result = applyExhibitor(mockJsonExhibitor, 'en')
      expect(result.name).toBe('Test Company')
      expect(result.subName).toBe('')
      expect(result.order).toBe('Test')
      expect(result.koma).toBe('Z-1')
      expect(result.country).toBe('Japan')
      expect(result.contents).toBe('Content')
    })
  })

  describe('convertJSONToExhibitorList', () => {
    const mockJsonData: JsonExhibitor[] = [
      {
        id: '1',
        name: 'テスト会社',
        nameEng: 'Test Company',
        order: 'テスト',
        orderEng: 'Test',
        koma: 'A-1',
        exhibition: 'exhibition1',
        genre: 'genre1',
        overseas: false,
        country: '日本',
        countryEng: 'Japan',
        webSite: 'https://example.com',
        contents: '内容',
        contentsEng: 'Content',
        sdgs: [],
      },
      {
        id: '',
        name: '',
        nameEng: '',
        order: '',
        orderEng: '',
        koma: '',
        exhibition: 'exhibition1',
        genre: 'genre1',
        overseas: false,
        country: '',
        countryEng: '',
        webSite: '',
        contents: '',
        contentsEng: '',
        sdgs: [],
      },
    ]

    it('JSONの出展社リストを変換。必須項目のないものは除外される', () => {
      const result = convertJSONToExhibitorList(mockJsonData, 'ja')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('1')
      expect(result[0].name).toBe('テスト会社')
    })
  })
})
