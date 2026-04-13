import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent } from 'vue'

import { useGenres } from '@/composables/useGenres'
import type { GenreJson } from '@/types'
import { getJson } from '@/utils'

// Mock dependencies
vi.mock('@/utils', () => ({
  getJson: vi.fn(),
}))

// Test component factory
const createTestComponent = (src: string) => {
  return defineComponent({
    setup() {
      const composable = useGenres(src)
      return composable
    },
    template: '<div></div>',
  })
}

describe('useGenres', () => {
  const mockSrc = 'genres.json'

  const mockGenreJson: GenreJson = {
    exhibitions: [
      {
        id: 'ex1',
        name: '展示会1',
        nameEng: 'Exhibition 1',
        color: 'primary',
        genres: ['genre1', 'genre2'],
      },
      {
        id: 'ex2',
        name: '展示会2',
        nameEng: 'Exhibition 2',
        color: 'secondary',
        genres: ['genre3'],
      },
    ],
    genres: [
      {
        id: 'genre1',
        name: 'ジャンル1',
        nameEng: 'Genre 1',
      },
      {
        id: 'genre2',
        name: 'ジャンル2',
        nameEng: 'Genre 2',
      },
      {
        id: 'genre3',
        name: 'ジャンル3',
        nameEng: 'Genre 3',
      },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('初期状態が正しいこと', () => {
    const { exhibitions, genres, exhibitionsMap, genresMap, allGenreCount, genreIDs, genreLists } =
      useGenres(mockSrc)

    expect(exhibitions.value).toBeUndefined()
    expect(genres.value).toBeUndefined()
    expect(exhibitionsMap.value).toEqual({})
    expect(genresMap.value).toEqual({})
    expect(allGenreCount.value).toBe(0)
    expect(genreIDs.value).toEqual([])
    expect(genreLists.value).toEqual({ ja: [], en: [] })
  })

  it('マウント時にデータを正常にロードできること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    // テストコンポーネントを使用してonMountedを実行
    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(getJson).toHaveBeenCalledWith(mockSrc)
  })

  it('exhibitionsMapが正しく変換されること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.exhibitionsMap).toEqual({
      ex1: mockGenreJson.exhibitions[0],
      ex2: mockGenreJson.exhibitions[1],
    })
  })

  it('genresMapが正しく変換されること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.genresMap).toEqual({
      genre1: mockGenreJson.genres[0],
      genre2: mockGenreJson.genres[1],
      genre3: mockGenreJson.genres[2],
    })
  })

  it('allGenreCountが正しく計算されること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.allGenreCount).toBe(3)
  })

  it('genreIDsが正しくリスト化されること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.genreIDs).toEqual(expect.arrayContaining(['genre1', 'genre2', 'genre3']))
    expect(wrapper.vm.genreIDs).toHaveLength(3)
  })

  it('genreListsが言語ごとに分けられること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.genreLists.ja).toEqual(['ジャンル1', 'ジャンル2', 'ジャンル3'])
    expect(wrapper.vm.genreLists.en).toEqual(['Genre 1', 'Genre 2', 'Genre 3'])
  })

  it('getExhibitionIDFromGenreIDが正しく動作すること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.getExhibitionIDFromGenreID('genre1')).toBe('ex1')
    expect(wrapper.vm.getExhibitionIDFromGenreID('genre2')).toBe('ex1')
    expect(wrapper.vm.getExhibitionIDFromGenreID('genre3')).toBe('ex2')
  })

  it('getExhibitionIDFromGenreIDで存在しないジャンルIDはundefinedを返すこと', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.getExhibitionIDFromGenreID('nonexistent')).toBeUndefined()
  })

  it('getExhibitionIDFromGenreIDでデータが読み込まれていない場合はundefinedを返すこと', () => {
    const wrapper = mount(createTestComponent(mockSrc))

    expect(wrapper.vm.getExhibitionIDFromGenreID('genre1')).toBeUndefined()
  })

  it('getGenreNameFromIDが日本語で正しく動作すること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.getGenreNameFromID('genre1', 'ja')).toBe('ジャンル1')
    expect(wrapper.vm.getGenreNameFromID('genre2', 'ja')).toBe('ジャンル2')
    expect(wrapper.vm.getGenreNameFromID('genre3', 'ja')).toBe('ジャンル3')
  })

  it('getGenreNameFromIDが英語で正しく動作すること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.getGenreNameFromID('genre1', 'en')).toBe('Genre 1')
    expect(wrapper.vm.getGenreNameFromID('genre2', 'en')).toBe('Genre 2')
    expect(wrapper.vm.getGenreNameFromID('genre3', 'en')).toBe('Genre 3')
  })

  it('getGenreNameFromIDで存在しないジャンルIDは空文字列を返すこと', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.vm.getGenreNameFromID('nonexistent', 'ja')).toBe('')
    expect(wrapper.vm.getGenreNameFromID('nonexistent', 'en')).toBe('')
  })

  it('getGenreNameFromIDでデータが読み込まれていない場合は空文字列を返すこと', () => {
    const wrapper = mount(createTestComponent(mockSrc))

    expect(wrapper.vm.getGenreNameFromID('genre1', 'ja')).toBe('')
    expect(wrapper.vm.getGenreNameFromID('genre1', 'en')).toBe('')
  })

  it('複数のジャンルを持つ展示会に対応すること', async () => {
    vi.mocked(getJson).mockResolvedValue(mockGenreJson)

    const wrapper = mount(createTestComponent(mockSrc))
    await wrapper.vm.$nextTick()
    await flushPromises()

    // ex1は genre1 と genre2 の両方を持つ
    expect(wrapper.vm.getExhibitionIDFromGenreID('genre1')).toBe('ex1')
    expect(wrapper.vm.getExhibitionIDFromGenreID('genre2')).toBe('ex1')
  })
})
