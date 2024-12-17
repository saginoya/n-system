<script setup lang="ts">
import { useVariantStyle } from '@/utils/styleHelpers/useVariantStyle'
import type { Color } from '@/types/color'
import type { Variant } from '@/types/variant'

withDefaults(
  defineProps<{
    color: Color
    type?: 'submit' | 'reset' | 'button'
    disabled?: boolean
    name?: string
    value?: string
    variant?: Variant
  }>(),
  {
    type: 'button',
    disabled: false
  }
)

const { getStyles } = useVariantStyle()
</script>

<template>
  <button
    :type
    :color
    :disabled
    :name
    :value
    class="overflow-hidden rounded border-2 font-bold disabled:opacity-25"
    :class="getStyles(color, variant)"
  >
    <span class="inline-block size-full px-4 py-2 hover:bg-blue-200/20 focus:bg-blue-200/20">
      <slot />
    </span>
  </button>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
