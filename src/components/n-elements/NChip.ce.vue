<script setup lang="ts">
import LinkBox from '@/components/parts/LinkBox.vue'
import { linkManager } from '@/composables/useLinkManager'
import { cn } from '@/lib/cn'
import { chipBase, variantConceptMap, type Variant } from '@/styles'
import type { Color, RouterLinkProps } from '@/types'
import { iconMap } from '@/utils'

type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<
    {
      color: Color
      variant?: Variant
      size?: Size
      closable?: () => void
    } & RouterLinkProps
  >(),
  {
    variant: 'flat',
    size: 'md',
  },
)

const { linkOptions } = linkManager({
  href: props.href,
  type: props.type,
  routerId: props.routerId,
})

const colorClsses = variantConceptMap[props.variant](props.color)

const sizeClasses = {
  sm: 'text-sm',
  md: '',
  lg: 'text-lg',
}
</script>

<template>
  <component
    :is="linkOptions ? LinkBox : 'span'"
    :href="linkOptions ? linkOptions.href : null"
    :target="linkOptions ? linkOptions.target : null"
    :icon="linkOptions ? linkOptions.icon : null"
    :class="
      cn(
        chipBase,
        'inline-flex items-center justify-between gap-1 overflow-hidden  align-middle border text-nowrap',
        colorClsses,
        { 'hover:ring focus:ring': linkOptions },
        {
          'px-2': !linkOptions,
        },
        sizeClasses[size],
      )
    "
  >
    <slot />
    <button v-if="closable" type="button" class="rounded-full bg-black/20" @click="closable()">
      <component :is="iconMap['close']" />
    </button>
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
