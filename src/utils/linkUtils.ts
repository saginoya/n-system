import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import IconOpenInNew from '@/components/icons/IconOpenInNew.vue'
import IconPdf from '@/components/icons/IconPdf.vue'
import { linkTypes, type LinkType } from '@/types'

import type { Component } from 'vue'

// リンクのタイプからターゲットを取得
export const getLinkTarget = (type: LinkType): '_self' | '_blank' => {
  return type === 'internal' ? '_self' : '_blank'
}

// リンクのタイプとアイコンのマッピング
const linkIconMap: Record<LinkType, Component> = {
  internal: IconArrowRight,
  external: IconOpenInNew,
  pdf: IconPdf,
  download: IconDownload,
}

type LinkOptions =
  | {
      isLink: true
      href: string
      type: LinkType
      target: '_self' | '_blank'
      icon: Component
    }
  | {
      isLink: false
      href: null
      type: null
      target: null
      icon: null
    }

/**
 * リンクのオプションを取得
 * 引数のいずれかが不正な場合は、リンクのオプションはnullになる
 * @param href リンクのURL
 * @param type リンクのタイプ
 * @returns リンクのオプション
 */
export const getLinkOptions = (
  href: string | undefined,
  type: LinkType | undefined,
): LinkOptions => {
  if (typeof href !== 'string' || !type || !linkTypes.includes(type)) {
    return {
      isLink: false,
      href: null,
      type: null,
      target: null,
      icon: null,
    }
  }
  return {
    isLink: true,
    href,
    type,
    target: getLinkTarget(type),
    icon: linkIconMap[type],
  }
}
