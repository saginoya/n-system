import { computed } from 'vue'

import { useRouter } from '@/composables/useRouter'
import type { RouterLinkProps } from '@/types'
import { getLinkOptions } from '@/utils'

const { getLinkById } = useRouter()

/**
 * コンポーネントのリンク関連のPropsの共通関数
 * @param link
 * @returns
 */
export const linkManager = (link: RouterLinkProps) => {
  const linkOptions = computed(() => {
    const router = link.routerId ? getLinkById(link.routerId) : undefined

    const name = router?.name ?? undefined
    const href = router?.href ?? link.href
    const type = router?.type ?? link.type

    if (!href || !type) return undefined

    return { ...getLinkOptions(href, type), name }
  })

  return {
    linkOptions,
  }
}
