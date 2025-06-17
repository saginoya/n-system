<script setup lang="ts">
import { computed } from 'vue'

import { bgColorMap } from '@/styles'
import type { Color, LinkType } from '@/types'
import { getLinkOptions } from '@/utils'

const props = defineProps<{
  color: Color
  size: SizeOptions
  href: string
  type: LinkType
}>()

const linkOptions = getLinkOptions(props.href, props.type)

const sizeOptions = {
  xs: 'size-16',
  sm: 'size-24',
  md: 'size-32',
  lg: 'size-40',
  xl: 'size-48',
}

type SizeOptions = keyof typeof sizeOptions

const variant = computed<string[]>(() => {
  const array = []
  array.push(bgColorMap[props.color])
  array.push(sizeOptions[props.size])

  return array
})
</script>

<template>
  <a
    v-if="linkOptions.isLink"
    :href="linkOptions.href"
    :target="linkOptions.target"
    class="inline-flex items-center justify-center rounded-full text-white transition-opacity hover:opacity-80 focus:opacity-80"
    :class="variant"
  >
    <slot />
  </a>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
