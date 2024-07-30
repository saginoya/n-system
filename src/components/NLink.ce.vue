<script setup lang="ts">
import { useLink } from '@/utils/useLink'
import { useURL } from '@/utils/useURL'
import type { LinkType } from '@/types/link'

defineProps<{
  href: string
  type: LinkType
  textAligned?: boolean
}>()

const { linkTarget, linkIcon } = useLink()
const { isSamePage } = useURL()
</script>

<template>
  <a
    class="box-content inline-block rounded-full px-3 py-1 hover:bg-blue-200/20 focus:bg-blue-200/20"
    :class="{
      'bg-slate-900/40': isSamePage(href),
      'contrast-75': isSamePage(href),
      '-translate-x-3': textAligned
    }"
    :href
    :target="linkTarget(type)"
  >
    <span class="flex items-center gap-1">
      <slot />
      <component v-if="type !== 'internal'" :is="linkIcon(type)" />
    </span>
  </a>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
