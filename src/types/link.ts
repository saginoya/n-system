export type LinkType = 'internal' | 'external' | 'doc'

export type Link = {
  name: string
  path: string
  type: LinkType
}
export type GlobalNav = {
  lang: Link[]
  header: Link[]
  footer: Link[]
}
