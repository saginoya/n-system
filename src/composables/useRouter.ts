import { ref } from 'vue'

import type { Router, RouterMap, LinkRouter, ImageRouter } from '@/types'
import { isLinkRouter, isImageRouter } from '@/utils'

// グローバル型宣言
declare global {
  // eslint-disable-next-line no-var
  var _nSystemRouter: RouterMap | undefined
}

export const useRouter = () => {
  // ルーティング情報
  const routerMap = ref<RouterMap>(new Map())

  const isReady = ref<boolean>(false)
  let pollTimer: number | undefined

  // Mapに変換する関数
  const convertMap = (router: Router[]): RouterMap => {
    const map = new Map()
    router.forEach((item) => {
      map.set(item.id, item)
    })

    return map
  }

  // ルーティング情報とglobalThisの情報を更新する
  const updateData = (router: Router[]) => {
    routerMap.value = convertMap(router)
    globalThis._nSystemRouter = routerMap.value
    isReady.value = true
  }

  // globalThisからデータを取得
  const getData = (): void => {
    if (!globalThis._nSystemRouter) return
    routerMap.value = globalThis._nSystemRouter
    isReady.value = true
  }

  // ポーリングでglobalThis._nSystemRouterを監視
  const pollGlobalRouter = () => {
    if (globalThis._nSystemRouter) {
      getData()
      if (pollTimer) clearInterval(pollTimer)
    }
  }

  if (!globalThis._nSystemRouter) {
    pollTimer = window.setInterval(pollGlobalRouter, 200)
  } else {
    getData()
    if (pollTimer) clearInterval(pollTimer)
  }

  // ルーティング情報からIDが一致する情報を取得する
  const getById = (id: string): Router | undefined => {
    return routerMap.value.get(id)
  }

  // ルーティング情報からIDが一致する情報を取得する（リンクのみ）
  const getLinkById = (id: string): LinkRouter | undefined => {
    const router = routerMap.value.get(id)
    return router && isLinkRouter(router) ? router : undefined
  }

  // ルーティング情報からIDが一致する情報を取得する（画像のみ）
  const getImageById = (id: string): ImageRouter | undefined => {
    const router = routerMap.value.get(id)
    return router && isImageRouter(router) ? router : undefined
  }

  // 複数IDに一致する情報を配列で返す
  const getByIds = (ids: string[]): Router[] => {
    return ids
      .map((id) => routerMap.value.get(id))
      .filter((item): item is Router => item !== undefined)
  }

  return {
    routerMap,
    isReady,
    getById,
    getLinkById,
    getImageById,
    getByIds,
    updateData,
  }
}
