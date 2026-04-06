import { describe, it, expect } from 'vitest'

import { generateHeading } from '@/utils/exhibitorList/'

describe('heading.ts', () => {
  describe('generateHeading', () => {
    it('ソートが関連順の時はundefinedを返す', () => {
      const result = generateHeading('search', 'Test', 'Genre')
      expect(result).toBeUndefined()
    })

    it('ソートが小間番号順の時はジャンル名を返す', () => {
      const result = generateHeading('koma', 'Test', 'Genre1')
      expect(result).toBe('Genre1')
    })

    it('ソートが名前順の時は頭文字を返す', () => {
      const result = generateHeading('order', 'Test Company', 'Genre')
      expect(result).toBe('T')
    })
  })
})
