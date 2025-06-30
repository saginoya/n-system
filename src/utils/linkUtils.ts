import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import IconOpenInNew from '@/components/icons/IconOpenInNew.vue'
import IconPdf from '@/components/icons/IconPdf.vue'
import type { LinkType, LinkTarget } from '@/types'

import type { Component } from 'vue'

// リンクのタイプからターゲットを取得
export const getLinkTarget = (type: LinkType): LinkTarget => {
  return type === 'internal' ? '_self' : '_blank'
}

// リンクのタイプとアイコンのマッピング
const linkIconMap: Record<LinkType, Component> = {
  internal: IconArrowRight,
  external: IconOpenInNew,
  pdf: IconPdf,
  download: IconDownload,
}

type LinkOptions = {
  href: string
  type: LinkType
  target: LinkTarget
  icon: Component
}

/**
 * リンクのオプションを取得
 * 引数のいずれかが不正な場合は、リンクのオプションはnullになる
 * @param href リンクのURL
 * @param type リンクのタイプ
 * @returns リンクのオプション
 */
export const getLinkOptions = (href: string, type: LinkType): LinkOptions => {
  return {
    href,
    type,
    target: getLinkTarget(type),
    icon: linkIconMap[type],
  }
}
