<script setup lang="ts">
import type { Variant } from '@/styles'
import { variantConceptMap } from '@/styles'
import type { Color } from '@/types'
import { iconMap, type Icon } from '@/utils'

withDefaults(
  defineProps<{
    color: Color
    type?: 'submit' | 'reset' | 'button'
    disabled?: boolean
    name?: string
    value?: string
    variant?: Variant
    prependIcon?: Icon
    appendIcon?: Icon
    className?: string
    onClick?: () => void
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
    :class="[variantConceptMap[variant](color), className]"
    @click="onClick"
  >
    <span
      class="inline-grid size-full grid-cols-[1em_auto_1em] items-center justify-stretch gap-1 p-2 hover:bg-blue-200/20 focus:bg-blue-200/20"
    >
      <component :is="prependIcon ? iconMap[prependIcon] : 'span'" />
      <span class="px-2"><slot /></span>
      <component :is="appendIcon ? iconMap[appendIcon] : 'span'" />
    </span>
  </button>
</template>
