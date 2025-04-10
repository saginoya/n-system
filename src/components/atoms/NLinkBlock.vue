<script setup lang="ts">
import NLinkText from '@/components/atoms/NLinkText.vue'
import { useURL } from '@/utils'
import type { LinkType } from '@/types'

defineProps<{
  href: string
  type: LinkType
}>()

const { isSamePage } = useURL()
</script>

<template>
  <NLinkText
    class="block rounded-full px-3 py-1 hover:bg-blue-200/30 focus:bg-blue-200/30"
    :class="{
      'bg-slate-900/40': isSamePage(href),
      'contrast-75': isSamePage(href),
    }"
    :href
    :type
  >
    <slot />
  </NLinkText>
</template>
