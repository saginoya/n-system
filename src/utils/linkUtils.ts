import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import IconOpenInNew from '@/components/icons/IconOpenInNew.vue'
import IconPdf from '@/components/icons/IconPdf.vue'
import type { LinkType } from '@/types'

import type { Component } from 'vue'

export const getLinkTarget = (type: LinkType): '_self' | '_blank' => {
  return type === 'internal' ? '_self' : '_blank'
}

export const linkIconMap: Record<LinkType, Component> = {
  internal: IconArrowRight,
  external: IconOpenInNew,
  pdf: IconPdf,
  download: IconDownload,
}
