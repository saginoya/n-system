<script setup lang="ts">
import LinkText from '@/components/parts/LinkText.vue'
import type { LinkType } from '@/types'
import { isCurrentPage } from '@/utils'

defineProps<{
  href: string
  type: LinkType
}>()
</script>

<template>
  <LinkText
    class="block rounded-full px-3 py-1 hover:bg-blue-200/30 focus:bg-blue-200/30"
    :class="{
      'bg-slate-900/40': isCurrentPage(href),
      'contrast-75': isCurrentPage(href),
    }"
    :href
    :type
  >
    <slot />
  </LinkText>
</template>
