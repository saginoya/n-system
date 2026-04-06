import { describe, it, expect } from 'vitest'

import type { Exhibitors } from '@/types'
import { searchByKeyword } from '@/utils/exhibitorList/'

describe('search.ts', () => {
  const mockExhibitors: Exhibitors = [
    {
      id: '1',
      name: 'Test Company',
      subName: '',
      order: 'Test',
      koma: 'A-1',
      exhibition: 'exhibition1',
      genre: 'genre1',
      genreName: undefined,
      overseas: false,
      country: 'Japan',
      webSite: '',
      contents: 'Some content',
      sdgs: [],
    },
    {
      id: '2',
      name: 'Another Company',
      subName: '',
      order: 'Another',
      koma: 'B-1',
      exhibition: 'exhibition1',
      genre: 'genre2',
      genreName: undefined,
      overseas: false,
      country: 'USA',
      webSite: '',
      contents: 'Other content',
      sdgs: [],
    },
  ]

  describe('searchByKeyword', () => {
    it('キーワードで絞り込みができる', () => {
      const result = searchByKeyword(mockExhibitors, 'Test', ['name'])
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Test Company')
    })

    it('キーワードが空の場合は全件返す', () => {
      const result = searchByKeyword(mockExhibitors, '', ['name'])
      expect(result).toEqual(mockExhibitors)
    })
  })
})
