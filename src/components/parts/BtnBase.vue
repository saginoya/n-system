<script setup lang="ts">
import type { Variant } from '@/styles'
import { variantConceptMap } from '@/styles'
import type { Color } from '@/types'
import { iconMap, type Icon } from '@/utils'

export type BtnBaseProps = {
  color: Color
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  name?: string
  value?: string
  label?: string
  variant?: Variant
  prependIcon?: Icon
  appendIcon?: Icon
  className?: string
  onClick?: () => void
}

withDefaults(defineProps<BtnBaseProps>(), {
  type: 'button',
  disabled: false,
  variant: 'flat',
})
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
      class="inline-flex size-full items-center justify-stretch gap-1 p-2 hover:bg-blue-200/20 focus:bg-blue-200/20"
    >
      <component v-if="prependIcon" :is="iconMap[prependIcon]" class="flex-none" />
      <span class="grow px-2">
        <slot>
          {{ label }}
        </slot>
      </span>
      <component v-if="appendIcon" :is="iconMap[appendIcon]" class="flex-none" />
    </span>
  </button>
</template>
