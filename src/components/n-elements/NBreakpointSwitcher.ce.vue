<script setup lang="ts">
import { ref } from 'vue'

import { useEventListener } from '@/composables/useEventListener'

type Breakpoint = 'md' | 'lg' | 'xl'

/**
 * Propsでは有効にするブレークポイントを指定する
 * 空のスロットを無視する処理が必要なため
 */
const props = defineProps<{
  md?: boolean
  lg?: boolean
  xl?: boolean
}>()

// TailwindCSSのブレークポイント
const breakpoint: Record<Breakpoint, number> = {
  md: 768,
  lg: 1024,
  xl: 1280,
}

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
  <div v-else>
    <slot />
  </div>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
