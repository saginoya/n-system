<script setup lang="ts">
import { bgColorMap } from '@/styles'
import type { Color, LinkType } from '@/types'
import { getLinkOptions } from '@/utils'

const props = defineProps<{
  color: Color
  href?: string
  type?: LinkType
}>()

const linkOptions = props.href && props.type ? getLinkOptions(props.href, props.type) : undefined
</script>

<template>
  <component
    :is="linkOptions ? 'a' : 'span'"
    :href="linkOptions ? linkOptions.href : null"
    :target="linkOptions ? linkOptions.target : null"
    class="inline-flex items-center justify-center gap-0.5 overflow-hidden rounded-full px-3 py-1 align-middle text-white"
    :class="[bgColorMap[color], { 'hover:opacity-75': href }]"
  >
    <span>
      <slot />
    </span>
    <component v-if="linkOptions" :is="linkOptions.icon" class="inline" />
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
