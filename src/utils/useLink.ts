import IconOpenInNew from '@/components/icons/IconOpenInNew.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import IconPdf from '@/components/icons/IconPdf.vue'
import type { LinkType } from '@/types/link'
import type { Component } from 'vue'

export const useLink = () => {
  const linkTarget = (type: LinkType): string => {
    return type === 'internal' ? '_self' : '_blank'
  }

  const linkIcon = (type: LinkType): Component | undefined => {
    switch (type) {
      case 'pdf':
        return IconPdf
      case 'download':
        return IconDownload
      case 'external':
        return IconOpenInNew
      default:
        return undefined
    }
  }

  return {
    linkTarget,
    linkIcon
  }
}
