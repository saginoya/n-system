<script setup lang="ts">
import type { Variant } from '@/styles'
import { variantConceptMap } from '@/styles'
import type { Color } from '@/types'

withDefaults(
  defineProps<{
    color: Color
    type?: 'submit' | 'reset' | 'button'
    disabled?: boolean
    name?: string
    value?: string
    variant?: Variant
    action?: () => void
  }>(),
  {
    type: 'button',
    disabled: false,
    variant: 'flat',
  },
)
</script>

<template>
  <button
    :type
    :color
    :disabled
    :name
    :value
    class="overflow-hidden rounded border-2 font-bold disabled:opacity-25"
    :class="variantConceptMap[variant](color)"
    @click="action"
  >
    <span class="inline-block size-full px-4 py-2 hover:bg-blue-200/20 focus:bg-blue-200/20">
      <slot />
    </span>
  </button>
</template>
