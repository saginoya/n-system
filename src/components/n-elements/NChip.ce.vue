<script setup lang="ts">
import { bgColorMap } from '@/styles'
import type { Color, LinkType } from '@/types'
import { getLinkOptions } from '@/utils'

const props = defineProps<{
  color: Color
  href?: string
  type?: LinkType
}>()

const linkOptions = getLinkOptions(props.href, props.type)
</script>

<template>
  <component
    :is="linkOptions.isLink ? 'a' : 'span'"
    :href="linkOptions.href"
    :target="linkOptions.target"
    class="inline-flex items-center justify-center gap-0.5 overflow-hidden rounded-full px-3 py-1 align-middle text-white"
    :class="[bgColorMap[color], { 'hover:opacity-75': href }]"
  >
    <span>
      <slot />
    </span>
    <component v-if="linkOptions.isLink" :is="linkOptions.icon" class="inline" />
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
