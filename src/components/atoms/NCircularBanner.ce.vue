<script setup lang="ts">
import { computed } from 'vue'
import { useLink } from '@/utils/useLink'
import { useColorStyle } from '@/utils/styleHelpers/useColorStyle'
import type { Color } from '@/types/color'
import type { LinkType } from '@/types/link'

const props = defineProps<{
  color: Color
  size: SizeOptions
  href: string
  type: LinkType
}>()

const { linkTarget } = useLink()
const { bgColor } = useColorStyle()

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
  array.push(bgColor(props.color))
  array.push(sizeOptions[props.size])

  return array
})
</script>

<template>
  <a
    class="inline-flex items-center justify-center rounded-full text-white transition-opacity hover:opacity-80 focus:opacity-80"
    :class="variant"
    :href="href"
    :target="linkTarget(type)"
  >
    <slot />
  </a>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
