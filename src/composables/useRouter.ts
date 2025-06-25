import { ref, onMounted } from 'vue'

import type { Router, RouterMap } from '@/types'

// グローバル型宣言
declare global {
  // eslint-disable-next-line no-var
  var _nSystemRouter: RouterMap | undefined
}

export const useRouter = () => {
  // ルーティング情報
  const routerMap = ref<RouterMap>(new Map())

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
  }

  // globalThisからデータを取得
  const getData = (): void => {
    if (!globalThis._nSystemRouter) return
    routerMap.value = globalThis._nSystemRouter
  }

  // ルーティング情報からIDが一致する情報を取得する
  const getById = (id: string): Router | undefined => {
    return routerMap.value.get(id)
  }

  onMounted(() => {
    getData()
  })

  return {
    getById,
    updateData,
  }
}
