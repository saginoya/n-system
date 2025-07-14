<script setup lang="ts">
import { ref } from 'vue'

import { useEventListener } from '@/composables/useEventListener'

/**
 * Propsでは有効にするブレークポイントを指定する
 * 空のスロットを無視する処理が必要なため
 */
const props = defineProps<{
  sm?: boolean
  md?: boolean
  lg?: boolean
  xl?: boolean
}>()

// TailwindCSSのブレークポイント
const breakpoint = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

type Breakpoint = keyof typeof breakpoint

// 現在のスクリーンの幅
const screenWidth = ref<number>(window.innerWidth)

const updateWidth = (): void => {
  screenWidth.value = window.innerWidth
}

// Propsとスクリーン幅から表示・非表示を判定する
const isVisible = (value: Breakpoint): boolean => {
  return props[value] && screenWidth.value >= breakpoint[value]
}

useEventListener(window, 'resize', updateWidth)
</script>

<template>
  <div v-if="isVisible('xl')">
    <slot name="xl" />
  </div>
  <div v-else-if="isVisible('lg')">
    <slot name="lg" />
  </div>
  <div v-else-if="isVisible('md')">
    <slot name="md" />
  </div>
  <div v-else-if="isVisible('sm')">
    <slot name="sm" />
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
