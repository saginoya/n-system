import { describe, it, expect } from 'vitest'

import { sortObjects, mergeSortObjects } from '@/utils/sortUtils'

describe('sortObjects', () => {
  it('文字列キーでソートできる', () => {
    const arr = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }]
    sortObjects(arr, 'name')
    expect(arr.map((v) => v.name)).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('数値キーでソートできる', () => {
    const arr = [{ value: 3 }, { value: 1 }, { value: 2 }]
    sortObjects(arr, 'value')
    expect(arr.map((v) => v.value)).toEqual([1, 2, 3])
  })

  it('undefinedを含む場合もソートできる', () => {
    const arr = [{ value: undefined }, { value: 2 }, { value: 1 }]
    sortObjects(arr, 'value')
    expect(arr.map((v) => v.value)).toEqual([1, 2, undefined])
  })

  it('空配列はそのまま返す', () => {
    const arr: { value: number }[] = []
    sortObjects(arr, 'value')
    expect(arr).toEqual([])
  })

  it('1要素配列はそのまま返す', () => {
    const arr = [{ value: 1 }]
    sortObjects(arr, 'value')
    expect(arr).toEqual([{ value: 1 }])
  })

  it('破壊的であること', () => {
    const arr = [{ value: 2 }, { value: 1 }]
    const result = sortObjects(arr, 'value')
    expect(result).toBe(arr)
  })
})

describe('mergeSortObjects', () => {
  it('文字列キーでソートできる', () => {
    const arr = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }]
    const result = mergeSortObjects(arr, 'name')
    expect(result.map((v) => v.name)).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('数値キーでソートできる', () => {
    const arr = [{ value: 3 }, { value: 1 }, { value: 2 }]
    const result = mergeSortObjects(arr, 'value')
    expect(result.map((v) => v.value)).toEqual([1, 2, 3])
  })

  it('undefinedを含む場合もソートできる', () => {
    const arr = [{ value: undefined }, { value: 2 }, { value: 1 }]
    const result = mergeSortObjects(arr, 'value')
    expect(result.map((v) => v.value)).toEqual([1, 2, undefined])
  })

  it('空配列はそのまま返す', () => {
    const arr: { value: number }[] = []
    const result = mergeSortObjects(arr, 'value')
    expect(result).toEqual([])
  })

  it('1要素配列はそのまま返す', () => {
    const arr = [{ value: 1 }]
    const result = mergeSortObjects(arr, 'value')
    expect(result).toEqual([{ value: 1 }])
  })

  it('非破壊的であること', () => {
    const arr = [{ value: 2 }, { value: 1 }]
    const result = mergeSortObjects(arr, 'value')
    expect(result).not.toBe(arr)
    expect(arr).toEqual([{ value: 2 }, { value: 1 }])
  })
})
