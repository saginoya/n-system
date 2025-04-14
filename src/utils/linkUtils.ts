import IconOpenInNew from '@/components/icons/IconOpenInNew.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import IconPdf from '@/components/icons/IconPdf.vue'
import type { LinkType } from '@/types'
import type { Component } from 'vue'

export const getLinkTarget = (type: LinkType): string => {
  return type === 'internal' ? '_self' : '_blank'
}

export const linkIconMap: Record<LinkType, Component | undefined> = {
  internal: undefined,
  external: IconOpenInNew,
  pdf: IconPdf,
  download: IconDownload,
}
