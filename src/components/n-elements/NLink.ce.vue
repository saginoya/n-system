<script setup lang="ts">
import type { LinkType } from '@/types'
import { getLinkTarget, linkIconMap, isCurrentPage } from '@/utils'

const props = defineProps<{
  href: string
  type: LinkType
  block?: boolean
}>()

const displayStyle = props.block ? 'flex' : 'inline-flex'
</script>

<template>
  <a
    :href
    :target="getLinkTarget(type)"
    class="items-center justify-center gap-0.5 border-b border-b-current hover:bg-blue-200/30 focus:bg-blue-200/30"
    :class="[
      displayStyle,
      {
        'bg-slate-900/40': isCurrentPage(href),
        'contrast-75': isCurrentPage(href),
      },
    ]"
  >
    <span>
      <slot />
    </span>
    <component :is="linkIconMap[type]" class="inline" />
  </a>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
