import type { LinkType } from './link'

// 基本となるリソース型
export type BaseRouter = {
  id: string
  name: string
}

// リンク用のリソース
export type LinkRouter = BaseRouter & {
  type: LinkType
  href: string
}

// 画像用のリソース
export type ImageRouter = BaseRouter & {
  type: 'image'
  src: string
}

// リンク・画像のいずれかのリソース・設定ファイルで利用される
export type ConfigRouter = BaseRouter & {
  type: LinkType | 'image'
  path: string
}

// ルーターで扱うリソースの型
export type Router = LinkRouter | ImageRouter

// ルーターのMap型
export type RouterMap = Map<string, Router>

// コンポーネントのProps用の型
export type RouterLinkProps = {
  href?: string
  type?: LinkType
  routerId?: string
}
