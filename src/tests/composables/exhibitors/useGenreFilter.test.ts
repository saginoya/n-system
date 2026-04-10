import { describe, it, expect, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import { useGenreFilter } from '@/composables/exhibitors/useGenreFilter'
import type { Genre, Exhibition, GenreID } from '@/types'

const mockGenresMap = ref<Record<string, Genre>>({
  genre1: { id: 'genre1', name: 'Genre 1', nameEng: 'Genre 1 EN' },
  genre2: { id: 'genre2', name: 'Genre 2', nameEng: 'Genre 2 EN' },
})

const mockExhibitions = ref<Exhibition[]>([
  {
    id: 'ex1',
    name: 'Exhibition 1',
    nameEng: 'Exhibition 1 EN',
    color: 'primary',
    genres: ['genre1', 'genre2'],
  },
])

describe('useGenreFilter', () => {
  const createUpdateStateGenres = (state: { value: Set<GenreID> }) => {
    return vi.fn((genres: GenreID[]) => {
      state.value = new Set(genres)
    })
  }

  it('全ジャンルが選択されている状態を表現できること', () => {
    const mockStateGenres = ref<Set<GenreID>>(new Set(['genre1', 'genre2']))
    const mockUpdateStateGenres = createUpdateStateGenres(mockStateGenres)
    const { genreFlags, isFilteringByGenre } = useGenreFilter(
      mockExhibitions,
      mockGenresMap,
      mockStateGenres,
      mockUpdateStateGenres,
      'ja',
    )

    expect(genreFlags.value).toEqual({ genre1: true, genre2: true })
    expect(isFilteringByGenre.value).toBe(false)
  })

  it('空Setは「未選択」を表すこと', () => {
    const mockStateGenres = ref<Set<GenreID>>(new Set())
    const mockUpdateStateGenres = createUpdateStateGenres(mockStateGenres)
    const { genreFlags, isFilteringByGenre } = useGenreFilter(
      mockExhibitions,
      mockGenresMap,
      mockStateGenres,
      mockUpdateStateGenres,
      'ja',
    )

    expect(genreFlags.value).toEqual({ genre1: false, genre2: false })
    expect(isFilteringByGenre.value).toBe(true)
  })

  it('ジャンルフラグを更新できること', () => {
    const mockStateGenres = ref<Set<GenreID>>(new Set(['genre1', 'genre2']))
    const mockUpdateStateGenres = createUpdateStateGenres(mockStateGenres)
    const { updateGenreFlags, genreFlags } = useGenreFilter(
      mockExhibitions,
      mockGenresMap,
      mockStateGenres,
      mockUpdateStateGenres,
      'ja',
    )

    updateGenreFlags(['genre1'], false)

    expect(genreFlags.value.genre1).toBe(false)
    expect(genreFlags.value.genre2).toBe(true)
  })

  it('フィルタリング状態を判定できること', () => {
    const mockStateGenres = ref<Set<GenreID>>(new Set(['genre1', 'genre2']))
    const mockUpdateStateGenres = createUpdateStateGenres(mockStateGenres)
    const { updateGenreFlags, isFilteringByGenre } = useGenreFilter(
      mockExhibitions,
      mockGenresMap,
      mockStateGenres,
      mockUpdateStateGenres,
      'ja',
    )

    updateGenreFlags(['genre1'], false)

    expect(isFilteringByGenre.value).toBe(true)
  })

  it('外部のstateGenresの変更を同期できること', async () => {
    const mockStateGenres = ref<Set<GenreID>>(new Set(['genre1']))
    const mockUpdateStateGenres = createUpdateStateGenres(mockStateGenres)
    const { genreFlags } = useGenreFilter(
      mockExhibitions,
      mockGenresMap,
      mockStateGenres,
      mockUpdateStateGenres,
      'ja',
    )

    expect(genreFlags.value.genre1).toBe(true)
    expect(genreFlags.value.genre2).toBe(false)

    mockStateGenres.value = new Set(['genre2'])
    await nextTick()

    expect(genreFlags.value.genre1).toBe(false)
    expect(genreFlags.value.genre2).toBe(true)
  })
})
