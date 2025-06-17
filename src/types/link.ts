export const linkTypes = ['internal', 'external', 'pdf', 'download'] as const

export type LinkType = (typeof linkTypes)[number]

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
