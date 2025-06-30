import type { Router } from '@/types'

export type Navigation = {
  id: string
  name: string
  type: 'link' | 'group'
  children: string[]
}

export type Config = {
  siteTitle: string[]
  copyright: string
  navigation: Navigation[]
  router: Router[]
}
