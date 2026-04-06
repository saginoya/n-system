import { describe, it, expect } from 'vitest'

import type { Exhibitors } from '@/types'
import { countExhibitors } from '@/utils/exhibitorList/'

describe('count.ts', () => {
  describe('countExhibitors', () => {
    it('出展社リストの件数が正しく計測される', () => {
      const emptyList: Exhibitors = []
      expect(countExhibitors(emptyList)).toBe(0)

      const list: Exhibitors = [
        {
          id: '1',
          name: 'Test',
          subName: '',
          order: 'Test',
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
      ]
      expect(countExhibitors(list)).toBe(1)
    })
  })
})
