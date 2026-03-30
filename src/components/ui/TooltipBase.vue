<script setup lang="ts">
import { useModal } from '@/composables/useModal'
import vClickOutside from '@/directives/clickOutside'
import { cn } from '@/lib/cn'

export type TooltipProps = {
  location?: 'top' | 'bottom' | 'right' | 'left'
  color?: 'light' | 'dark'
  className?: string
}

// Props
withDefaults(defineProps<TooltipProps>(), { location: 'top', color: 'light' })

// ツールチップの状態管理
const { visible, show, dismiss } = useModal()

// 表示位置のスタイル
const locationStyleMap = {
  top: '-top-1 left-1/2 -translate-y-full -translate-x-1/2',
  bottom: '-bottom-1 left-1/2 translate-y-full -translate-x-1/2',
  right: '-right-1 top-1/2 translate-x-full -translate-y-1/2',
  left: '-left-1 top-1/2 -translate-x-full -translate-y-1/2',
}

// 色のスタイル
const colorStyleMap = {
  light: ['bg-white border border-gray-200'],
  dark: ['bg-slate-800 text-white'],
}
</script>

<template>
  <div v-click-outside="dismiss" class="relative inline-block">
    <button class="hover:opacity-70 cursor-pointer" @click="show()">
      <slot />
    </button>

    <div
      :class="
        cn(
          'rounded  z-50 p-2 text-sm transition-all delay-150 ease-in-out absolute inline-block whitespace-nowrap shadow-lg',
          visible ? 'visible opacity-100' : 'invisible opacity-0',
          locationStyleMap[location],
          colorStyleMap[color],
          className,
        )
      "
    >
      <slot name="text" />
    </div>
  </div>
</template>
