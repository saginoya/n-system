<script setup lang="ts">
import { computed } from 'vue'
import { getLinkTarget } from '@/utils'
import { bgColorMap } from '@/styles'
import type { Color, LinkType } from '@/types'

const props = defineProps<{
  color: Color
  size: SizeOptions
  href: string
  type: LinkType
}>()

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
    class="inline-flex items-center justify-center rounded-full text-white transition-opacity hover:opacity-80 focus:opacity-80"
    :class="variant"
    :href="href"
    :target="getLinkTarget(type)"
  >
    <slot />
  </a>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
