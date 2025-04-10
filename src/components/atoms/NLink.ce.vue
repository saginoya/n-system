<script setup lang="ts">
import NLinkText from '@/components/atoms/NLinkText.vue'
import { useURL } from '@/utils'
import type { LinkType } from '@/types/link'

defineProps<{
  href: string
  type: LinkType
  textAligned?: boolean
}>()

const { isSamePage } = useURL()
</script>

<template>
  <NLinkText
    class="inline-flex items-center justify-center rounded-full bg-blue-200/10 px-3 py-1 hover:bg-blue-200/30 focus:bg-blue-200/30"
    :class="{
      'bg-slate-900/40': isSamePage(href),
      'contrast-75': isSamePage(href),
      '-translate-x-3': textAligned,
    }"
    :href
    :type
  >
    <slot />
  </NLinkText>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
