export type LinkType = 'internal' | 'external' | 'pdf' | 'download'

export type Link = {
  name: string
  path: string
  type: LinkType
}
export type GlobalNav = {
  related: Link[]
  header: Link[]
  footer: Link[]
}
