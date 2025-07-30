import type { Router, LinkRouter, ImageRouter, ConfigRouter, LinkType } from '@/types'

export const isLinkRouter = (router: Router | ConfigRouter): router is LinkRouter => {
  return router.type !== 'image'
}

export const isImageRouter = (router: Router | ConfigRouter): router is ImageRouter => {
  return router.type === 'image'
}

export const convertConfigToRouter = (config: ConfigRouter): Router => {
  if (isImageRouter(config)) {
    const { ...rest } = config
    return { ...rest, src: rest.path } as ImageRouter
  } else {
    const { type, ...rest } = config
    return {
      ...rest,
      type: type as LinkType,
      href: rest.path,
    } as LinkRouter
  }
}

export const validateConfigRouter = (config: ConfigRouter): boolean => {
  return (
    typeof config.path === 'string' &&
    typeof config.id === 'string' &&
    typeof config.name === 'string'
  )
}
