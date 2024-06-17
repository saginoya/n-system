<script setup lang="ts">
import { useColorStyle } from '@/utils/useColorStyle'
import type { Color } from '@/types/color'

defineProps<{
  type?: 'submit' | 'reset' | 'button'
  color: Color
  disabled?: boolean
  name?: string
  value?: string
}>()

const { bgColor, borderColor } = useColorStyle()
</script>

<template>
  <button
    :type
    :color
    :disabled
    :name
    :value
    class="rounded border-2 font-bold text-white"
    :class="[bgColor(color), borderColor(color)]"
  >
    <span class="inline-block size-full px-4 py-2 hover:bg-black/20">
      <slot />
    </span>
  </button>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
