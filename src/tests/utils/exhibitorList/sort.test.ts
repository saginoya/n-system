import { describe, it, expect } from 'vitest'

import type { Exhibitors } from '@/types'
import { sortExhibitorList } from '@/utils/exhibitorList/'

describe('sort.ts', () => {
  const mockExhibitors: Exhibitors = [
    {
      id: '1',
      name: 'Company A',
      subName: '',
      order: 'B',
      koma: 'B-1',
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
      order: 'A',
      koma: 'A-1',
      exhibition: 'exhibition1',
      genre: 'genre2',
      genreName: undefined,
      overseas: false,
      country: 'USA',
      webSite: '',
      contents: '',
      sdgs: [],
    },
  ]

  describe('sortExhibitorList', () => {
    it('ソート条件が関連順の場合はリストをそのまま返す', () => {
      const result = sortExhibitorList(mockExhibitors, 'search')
      expect(result).toEqual(mockExhibitors)
    })

    it('ソートの条件が名前順の時に正しくソートされる', () => {
      const result = sortExhibitorList(mockExhibitors, 'order')
      expect(result[0].order).toBe('A')
      expect(result[1].order).toBe('B')
    })

    it('ソートの条件が小間番号順の時に正しくソートされる', () => {
      const result = sortExhibitorList(mockExhibitors, 'koma')
      expect(result[0].koma).toBe('A-1')
      expect(result[1].koma).toBe('B-1')
    })
  })
})
