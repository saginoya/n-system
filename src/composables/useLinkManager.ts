import { computed } from 'vue'

import { useRouter } from '@/composables/useRouter'
import type { LinkType } from '@/types'
import { getLinkOptions } from '@/utils'

export type LinkProps = {
  href?: string
  type?: LinkType
  routerId?: string
}

const { getById } = useRouter()

/**
 * コンポーネントのリンク関連のPropsの共通関数
 * @param link
 * @returns
 */
export const linkManager = (link: LinkProps) => {
  const linkOptions = computed(() => {
    const router = link.routerId ? getById(link.routerId) : undefined

    const href = router?.path ?? link.href
    const type = router?.type ?? link.type

    if (!href || !type) return undefined

    return getLinkOptions(href, type)
  })

  return {
    linkOptions,
  }
}
