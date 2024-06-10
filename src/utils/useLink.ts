import IconOpenInNew from '@/components/icons/IconOpenInNew.vue'
import IconFileOpen from '@/components/icons/IconFileOpen.vue'
import type { LinkType } from '@/types/link'
import type { Component } from 'vue'

export const useLink = () => {
  const linkTarget = (type: LinkType): string => {
    return type === 'internal' ? '_self' : '_blank'
  }

  const linkIcon = (type: LinkType): Component | undefined => {
    switch (type) {
      case 'doc':
        return IconFileOpen
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
