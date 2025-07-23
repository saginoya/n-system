import type { Router, Image } from '@/types'

export type Navigation = {
  id: string
  name: string
  type: 'link' | 'group'
  children: string[]
}

export type Config = {
  siteTitle: string[]
  copyright: string
  baseDirectory: string
  navigation: Navigation[]
  router: Router[]
  logoImage?: Image
}
