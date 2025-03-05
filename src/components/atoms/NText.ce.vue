<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: SizeOptions
  }>(),
  {
    size: 'base',
  },
)

const sizeOptions = {
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
}
type SizeOptions = keyof typeof sizeOptions
</script>

<template>
  <span :class="sizeOptions[size]">
    <slot />
  </span>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
