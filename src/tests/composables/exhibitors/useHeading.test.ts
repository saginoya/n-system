import { describe, it, expect } from 'vitest'
import { ref } from 'vue'

import { useHeading } from '@/composables/exhibitors/useHeading'
import type { Exhibitors } from '@/types'

const mockExhibitors: Exhibitors = [
  {
    id: '1',
    name: 'Test Company',
    subName: '',
    order: 'A',
    koma: 'A-1',
    exhibition: 'ex1',
    genre: 'genre1',
    genreName: 'Genre 1',
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
    order: 'A',
    koma: 'A-2',
    exhibition: 'ex1',
    genre: 'genre1',
    genreName: 'Genre 1',
    overseas: false,
    country: 'Japan',
    webSite: '',
    contents: 'Other content',
    sdgs: [],
  },
]

describe('useHeading', () => {
  it('見出しを生成できること', () => {
    const exhibitorList = ref(mockExhibitors)
    const sort = ref('order' as const)

    const { headings, getHeading, showHeading } = useHeading(exhibitorList, sort)

    expect(headings.value).toEqual(['A', 'A'])
    expect(getHeading(0)).toBe('A')
    expect(showHeading(0)).toBe(true) // 最初の要素は表示
    expect(showHeading(1)).toBe(false) // 同じ見出しなので非表示
  })
})
