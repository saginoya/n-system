<script setup lang="ts">
import { justifyMap, justifyMdMap } from '@/styles'
import type { Justify } from '@/styles'

const props = defineProps<{
  justify?: Justify
  justifyMd?: Justify
}>()

const justifyStyles = (): (string | null)[] => {
  return [
    props.justify ? justifyMap[props.justify] : null,
    props.justifyMd ? justifyMdMap[props.justifyMd] : null,
  ]
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2" :class="justifyStyles()">
    <slot />
  </div>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
