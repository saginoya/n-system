<script setup lang="ts">
import { cn } from '@/lib/cn'
import { justifyMap, justifyMdMap, gapMap } from '@/styles'
import type { Justify, Gap } from '@/styles'

const props = withDefaults(
  defineProps<{
    justify?: Justify
    justifyMd?: Justify
    gap?: Gap
  }>(),
  {
    gap: '2',
  },
)

const justifyStyles = (): (string | null)[] => {
  return [
    props.justify ? justifyMap[props.justify] : null,
    props.justifyMd ? justifyMdMap[props.justifyMd] : null,
  ]
}
</script>

<template>
  <div :class="cn('flex flex-wrap items-center', justifyStyles(), gapMap[gap])">
    <slot />
  </div>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
