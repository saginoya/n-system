<script setup lang="ts">
import { cn } from '@/lib/cn'
import { textColorMap } from '@/styles'
import type { Color } from '@/types'

withDefaults(
  defineProps<{
    as?: As
    size?: Size
    weight?: Weight
    align?: Align
    color?: Color
  }>(),
  {
    as: 'span',
  },
)

type As = 'span' | 'p' | 'strong' | 'del'

const sizeMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
} as const
type Size = keyof typeof sizeMap

const weightMap = {
  light: 'font-light',
  normal: 'font-normal',
  bold: 'font-bold',
} as const

type Weight = keyof typeof weightMap

const alignMap = {
  center: 'text-center',
  justify: 'text-justify',
  start: 'text-start',
  end: 'text-end',
} as const
type Align = keyof typeof alignMap
</script>

<template>
  <component
    :is="as"
    :class="
      cn(
        size && sizeMap[size],
        weight && weightMap[weight],
        align && alignMap[align],
        color && textColorMap[color],
      )
    "
  >
    <slot />
  </component>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
