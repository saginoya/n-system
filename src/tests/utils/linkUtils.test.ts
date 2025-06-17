import { describe, it, expect } from 'vitest'

import type { LinkType } from '@/types'
import { getLinkTarget, getLinkOptions } from '@/utils/linkUtils'

describe('linkUtils', () => {
  describe('getLinkTarget', () => {
    it('internalの場合は_selfを返す', () => {
      expect(getLinkTarget('internal')).toBe('_self')
    })

    it('externalの場合は_blankを返す', () => {
      expect(getLinkTarget('external')).toBe('_blank')
    })

    it('pdfの場合は_blankを返す', () => {
      expect(getLinkTarget('pdf')).toBe('_blank')
    })

    it('downloadの場合は_blankを返す', () => {
      expect(getLinkTarget('download')).toBe('_blank')
    })
  })

  describe('getLinkOptions', () => {
    it('有効なhrefとtypeが渡された場合、正しいリンクオプションを返す', () => {
      const href = 'https://example.com'
      const type: LinkType = 'external'
      const result = getLinkOptions(href, type)

      expect(result).toEqual({
        isLink: true,
        href: 'https://example.com',
        type: 'external',
        target: '_blank',
        icon: expect.any(Object),
      })
    })

    it('hrefがundefinedの場合、リンクなしのオプションを返す', () => {
      const result = getLinkOptions(undefined, 'internal')

      expect(result).toEqual({
        isLink: false,
        href: null,
        type: null,
        target: null,
        icon: null,
      })
    })

    it('typeがundefinedの場合、リンクなしのオプションを返す', () => {
      const result = getLinkOptions('https://example.com', undefined)

      expect(result).toEqual({
        isLink: false,
        href: null,
        type: null,
        target: null,
        icon: null,
      })
    })

    it('無効なtypeが渡された場合、リンクなしのオプションを返す', () => {
      const result = getLinkOptions('https://example.com', 'invalid' as LinkType)

      expect(result).toEqual({
        isLink: false,
        href: null,
        type: null,
        target: null,
        icon: null,
      })
    })
  })
})
