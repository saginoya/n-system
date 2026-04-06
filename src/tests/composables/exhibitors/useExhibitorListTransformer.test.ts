import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'

import { useExhibitorListTransformer } from '@/composables/exhibitors/useExhibitorListTransformer'
import type { Exhibitors, OverseasType } from '@/types'

// Mock utils
vi.mock('@/utils/exhibitorList', () => ({
  countExhibitors: vi.fn((list: Exhibitors) => list.length),
  filterByFavorites: vi.fn((list: Exhibitors) => list),
  filterByGenres: vi.fn((list: Exhibitors, genres: string[]) =>
    genres.length === 0 ? list : list.filter((item) => genres.includes(item.genre)),
  ),
  filterByOverseas: vi.fn((list: Exhibitors) => list),
  searchByKeyword: vi.fn((list: Exhibitors, keyword: string) =>
    keyword ? list.filter((item) => item.name.includes(keyword)) : list,
  ),
  sortExhibitorList: vi.fn((list: Exhibitors) => list),
}))

const mockExhibitors: Exhibitors = [
  {
    id: '1',
    name: 'Test Company',
    subName: '',
    order: 'Test',
    koma: 'A-1',
    exhibition: 'exhibition1',
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
    order: 'Another',
    koma: 'B-1',
    exhibition: 'exhibition1',
    genre: 'genre2',
    genreName: 'Genre 2',
    overseas: true,
    country: 'USA',
    webSite: '',
    contents: 'Other content',
    sdgs: [],
  },
]

describe('useExhibitorListTransformer', () => {
  it('フィルターなしで全件返すこと', () => {
    const rawData = ref(mockExhibitors)
    const options = {
      favorite: ref(false),
      myFavorites: ref([]),
      genres: ref([]),
      overseas: ref(new Set<OverseasType>(['domestic', 'overseas'])),
      keyword: ref(''),
      sort: ref('search' as const),
    }

    const { exhibitorList, numExhibitorList } = useExhibitorListTransformer(rawData, options)

    expect(exhibitorList.value).toEqual(mockExhibitors)
    expect(numExhibitorList.value).toBe(2)
  })

  it('ジャンルフィルターが適用されること', () => {
    const rawData = ref(mockExhibitors)
    const options = {
      favorite: ref(false),
      myFavorites: ref([]),
      genres: ref(['genre1']),
      overseas: ref(new Set<OverseasType>(['domestic', 'overseas'])),
      keyword: ref(''),
      sort: ref('search' as const),
    }

    const { exhibitorList } = useExhibitorListTransformer(rawData, options)

    expect(exhibitorList.value).toHaveLength(1)
    expect(exhibitorList.value[0].id).toBe('1')
  })

  it('キーワード検索が適用されること', () => {
    const rawData = ref(mockExhibitors)
    const options = {
      favorite: ref(false),
      myFavorites: ref([]),
      genres: ref([]),
      overseas: ref(new Set<OverseasType>(['domestic', 'overseas'])),
      keyword: ref('Test'),
      sort: ref('search' as const),
    }

    const { exhibitorList } = useExhibitorListTransformer(rawData, options)

    expect(exhibitorList.value).toHaveLength(1)
    expect(exhibitorList.value[0].name).toBe('Test Company')
  })
})
