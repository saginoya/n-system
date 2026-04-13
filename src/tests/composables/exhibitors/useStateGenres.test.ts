import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'

import { useStateGenres } from '@/composables/exhibitors/useStateGenres'
import type { GenreID } from '@/types'

describe('useStateGenres', () => {
  it('初期値が空Setであること', () => {
    const initValues = ref<GenreID[]>([])
    const { stateGenres } = useStateGenres(initValues)
    expect(stateGenres.value).toEqual(new Set([]))
  })

  it('初期値が指定された場合に正しく設定されること', () => {
    const initValues = ref<GenreID[]>(['genre1', 'genre2'])
    const { stateGenres } = useStateGenres(initValues)
    expect(stateGenres.value).toEqual(new Set(['genre1', 'genre2']))
  })

  it('ジャンルを追加できること', () => {
    const initValues = ref<GenreID[]>([])
    const { addStateGenres, stateGenres } = useStateGenres(initValues)
    addStateGenres('genre1')
    expect(stateGenres.value).toEqual(new Set(['genre1']))
  })

  it('ジャンルを削除できること', () => {
    const initValues = ref<GenreID[]>([])
    const { addStateGenres, removeStateGenres, stateGenres } = useStateGenres(initValues)
    addStateGenres('genre1')
    removeStateGenres('genre1')
    expect(stateGenres.value).toEqual(new Set([]))
  })

  it('clearStateGenresで初期値にリセットできること', () => {
    const initValues = ref<GenreID[]>(['genre1'])
    const { addStateGenres, clearStateGenres, stateGenres } = useStateGenres(initValues)
    addStateGenres('genre2')
    expect(stateGenres.value).toEqual(new Set(['genre1', 'genre2']))
    clearStateGenres()
    expect(stateGenres.value).toEqual(new Set(['genre1']))
  })

  it('initValuesが変更されたときにstateGenresが更新されること', async () => {
    const initValues = ref<GenreID[]>(['genre1'])
    const { stateGenres } = useStateGenres(initValues)
    expect(stateGenres.value).toEqual(new Set(['genre1']))

    initValues.value = ['genre2', 'genre3']
    await nextTick()
    expect(stateGenres.value).toEqual(new Set(['genre2', 'genre3']))
  })

  it('updateStateGenresで値を更新できること', () => {
    const initValues = ref<GenreID[]>([])
    const { updateStateGenres, stateGenres } = useStateGenres(initValues)
    updateStateGenres(['genre1', 'genre2'])
    expect(stateGenres.value).toEqual(new Set(['genre1', 'genre2']))
  })
})
