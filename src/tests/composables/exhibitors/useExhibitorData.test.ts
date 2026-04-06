import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useExhibitorData } from '@/composables/exhibitors/useExhibitorData'
import { getJson } from '@/utils'
import { convertJSONToExhibitorList } from '@/utils/exhibitorList'

// Mock dependencies
vi.mock('@/utils', () => ({
  getJson: vi.fn(),
}))

vi.mock('@/utils/exhibitorList', () => ({
  convertJSONToExhibitorList: vi.fn(),
  countExhibitors: vi.fn(() => 0),
}))

describe('useExhibitorData', () => {
  const mockSrc = 'test.json'
  const mockLang = 'ja' as const
  const mockGetGenreNameFromID = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('初期状態が正しいこと', () => {
    const { rawExhibitorList, isLoading, error, numRawExhibitorList } = useExhibitorData(
      mockSrc,
      mockLang,
      mockGetGenreNameFromID,
      { autoLoad: false },
    )

    expect(rawExhibitorList.value).toEqual([])
    expect(isLoading.value).toBe(false)
    expect(error.value).toBeUndefined()
    expect(numRawExhibitorList.value).toBe(0)
  })

  it('データを正常にロードできること', async () => {
    const mockJson = [{ id: '1', name: 'Test' }]
    const mockConverted = [
      {
        id: '1',
        name: 'Test',
        subName: '',
        order: 'Test',
        koma: 'A-1',
        exhibition: 'ex1',
        genre: 'genre1',
        genreName: 'Test Genre',
        overseas: false,
        country: 'Japan',
        webSite: '',
        contents: 'Some content',
        sdgs: [],
      },
    ]

    vi.mocked(getJson).mockResolvedValue(mockJson)
    vi.mocked(convertJSONToExhibitorList).mockResolvedValue(mockConverted)

    const { load, rawExhibitorList, isLoading, error } = useExhibitorData(
      mockSrc,
      mockLang,
      mockGetGenreNameFromID,
      { autoLoad: false },
    )

    await load()

    expect(getJson).toHaveBeenCalledWith(mockSrc)
    expect(convertJSONToExhibitorList).toHaveBeenCalledWith(mockJson, mockLang)
    expect(rawExhibitorList.value).toEqual(mockConverted)
    expect(isLoading.value).toBe(false)
    expect(error.value).toBeUndefined()
  })

  it('エラーが発生した場合にエラーを設定すること', async () => {
    const mockError = new Error('Network error')
    vi.mocked(getJson).mockRejectedValue(mockError)

    const { load, error, isLoading } = useExhibitorData(mockSrc, mockLang, mockGetGenreNameFromID, {
      autoLoad: false,
    })

    await load()

    expect(error.value).toBe(mockError)
    expect(isLoading.value).toBe(false)
  })
})
