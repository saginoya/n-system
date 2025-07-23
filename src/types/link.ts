export const linkTypes = ['internal', 'external', 'pdf', 'download'] as const

export type LinkType = (typeof linkTypes)[number]

export type LinkTarget = '_self' | '_blank' | '_parent' | '_top'

export type Link = {
  name: string
  path: string
  type: LinkType
}

export type Router = {
  id: string
  name: string
  path: string
  type: LinkType & 'image'
}

export type RouterMap = Map<string, Router>
