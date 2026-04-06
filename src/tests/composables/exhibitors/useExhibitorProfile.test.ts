import { describe, it, expect } from 'vitest'
import { ref } from 'vue'

import { useExhibitorProfile } from '@/composables/exhibitors/useExhibitorProfile'
import type { Exhibitor, Exhibition } from '@/types'

const mockExhibitor: Exhibitor = {
  id: '1',
  name: 'Test Company',
  subName: 'Sub Name',
  order: 'Test',
  koma: 'A-1',
  exhibition: 'ex1',
  genre: 'genre1',
  genreName: 'Genre 1',
  overseas: false,
  country: 'Japan',
  webSite: 'http://example.com',
  contents: 'Some content',
  sdgs: [1, 2],
}

const mockExhibitionsMap = ref<Record<string, Exhibition>>({
  ex1: {
    id: 'ex1',
    name: 'Exhibition 1',
    nameEng: 'Exhibition 1 EN',
    color: 'primary',
    genres: ['genre1'],
  },
})

describe('useExhibitorProfile', () => {
  it('出展社情報をプロフィール形式に変換できること', () => {
    const { setCurrentExhibitor, currentExhibitor } = useExhibitorProfile(mockExhibitionsMap)

    setCurrentExhibitor(mockExhibitor, 'ja')

    expect(currentExhibitor.value).toEqual({
      lang: 'ja',
      id: '1',
      name: 'Test Company',
      koma: 'A-1',
      overseas: false,
      country: 'Japan',
      exhibition: 'Exhibition 1',
      subName: 'Sub Name',
      genre: 'Genre 1',
      webSite: 'http://example.com',
      contents: 'Some content',
      sdgs: [1, 2],
      color: 'primary',
    })
  })

  it('リセットできること', () => {
    const { setCurrentExhibitor, resetCurrentExhibitor, currentExhibitor } =
      useExhibitorProfile(mockExhibitionsMap)

    setCurrentExhibitor(mockExhibitor, 'ja')
    expect(currentExhibitor.value).toBeDefined()

    resetCurrentExhibitor()
    expect(currentExhibitor.value).toBeUndefined()
  })
})
