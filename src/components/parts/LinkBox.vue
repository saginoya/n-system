<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/lib/cn'
import type { LinkTarget, LinkType } from '@/types'
import { getLinkOptions } from '@/utils'

import type { Component } from 'vue'

const props = defineProps<
  | {
      href: string
      target: LinkTarget
      icon: Component
      class?: string
    }
  | {
      href: string
      type: LinkType
      class?: string
    }
>()

const linkOptions = computed(() => {
  if ('type' in props) {
    return getLinkOptions(props.href, props.type)
  } else {
    return {
      href: props.href,
      target: props.target,
      icon: props.icon,
    }
  }
})

const commonClasses = 'flex items-center justify-between'
</script>

<template>
  <a
    :href="linkOptions.href"
    :target="linkOptions.target"
    :class="cn(commonClasses, 'hover:bg-blue-200/30 focus:bg-blue-200/30', props.class)"
  >
    <span>
      <slot />
    </span>
    <component :is="linkOptions.icon" class="inline" />
  </a>
</template>
