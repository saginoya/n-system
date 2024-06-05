export type Link = {
  name: string
  path: string
  type: 'internal' | 'external' | 'doc'
}
export type GlobalNav = {
  lang: Link[]
  header: Link[]
  footer: Link[]
}
