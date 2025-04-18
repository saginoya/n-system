<script setup lang="ts">
import LinkText from '@/components/parts/LinkText.vue'
import type { LinkType } from '@/types'
import { isCurrentPage } from '@/utils'

defineProps<{
  href: string
  type: LinkType
  textAligned?: boolean
}>()
</script>

<template>
  <LinkText
    class="inline-flex items-center justify-center rounded-full bg-blue-200/10 px-3 py-1 hover:bg-blue-200/30 focus:bg-blue-200/30"
    :class="{
      'bg-slate-900/40': isCurrentPage(href),
      'contrast-75': isCurrentPage(href),
      '-translate-x-3': textAligned,
    }"
    :href
    :type
  >
    <slot />
  </LinkText>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
