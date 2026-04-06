import { describe, it, expect } from 'vitest'

import type { Exhibitors } from '@/types'
import { filterByFavorites, filterByGenres, filterByOverseas } from '@/utils/exhibitorList/'

describe('filter.ts', () => {
  const mockExhibitors: Exhibitors = [
    {
      id: '1',
      name: 'Company A',
      subName: '',
      order: 'A',
      koma: 'A-1',
      exhibition: 'exhibition1',
      genre: 'genre1',
      genreName: undefined,
      overseas: false,
      country: 'Japan',
      webSite: '',
      contents: '',
      sdgs: [],
    },
    {
      id: '2',
      name: 'Company B',
      subName: '',
      order: 'B',
      koma: 'B-1',
      exhibition: 'exhibition1',
      genre: 'genre2',
      genreName: undefined,
      overseas: true,
      country: 'USA',
      webSite: '',
      contents: '',
      sdgs: [],
    },
    {
      id: '3',
      name: 'Company C',
      subName: '',
      order: 'C',
      koma: 'C-1',
      exhibition: 'exhibition1',
      genre: 'genre1',
      genreName: undefined,
      overseas: false,
      country: 'Japan',
      webSite: '',
      contents: '',
      sdgs: [],
    },
  ]

  describe('filterByFavorites', () => {
    it('出展社リストのフィルター（お気に入り）', () => {
      const result = filterByFavorites(mockExhibitors, [])
      expect(result).toEqual([])
    })

    it('出展社リストのフィルター（お気に入り）', () => {
      const result = filterByFavorites(mockExhibitors, ['1', '3'])
      expect(result).toHaveLength(2)
      expect(result.map((e) => e.id)).toEqual(['1', '3'])
    })
  })

  describe('filterByGenres', () => {
    it('出展社リストのフィルター（ジャンル）', () => {
      const result = filterByGenres(mockExhibitors, ['genre1'])
      expect(result).toHaveLength(2)
      expect(result.map((e) => e.id)).toEqual(['1', '3'])
    })

    it('出展社リストのフィルター（ジャンル）', () => {
      const result = filterByGenres(mockExhibitors, ['nonexistent'])
      expect(result).toEqual([])
    })
  })

  describe('filterByOverseas', () => {
    it('出展社リストのフィルター（海外）', () => {
      const result = filterByOverseas(mockExhibitors, new Set(['overseas']))
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('2')
    })

    it('出展社リストのフィルター（国内／海外）', () => {
      const result = filterByOverseas(mockExhibitors, new Set(['domestic', 'overseas']))
      expect(result).toHaveLength(3)
    })
  })
})
