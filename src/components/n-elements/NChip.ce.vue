<script setup lang="ts">
import LinkBox from '@/components/parts/LinkBox.vue'
import { linkManager } from '@/composables/useLinkManager'
import { cn } from '@/lib/cn'
import { chipBase, variantConceptMap, type Variant } from '@/styles'
import type { Color, RouterLinkProps } from '@/types'

const props = withDefaults(
  defineProps<
    {
      color: Color
      variant?: Variant
    } & RouterLinkProps
  >(),
  {
    variant: 'flat',
  },
)

const { linkOptions } = linkManager({
  href: props.href,
  type: props.type,
  routerId: props.routerId,
})

const colorCalsses = variantConceptMap[props.variant](props.color)
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
        'inline-flex overflow-hidden  align-middle border',
        colorCalsses,
        { 'hover:ring focus:ring': linkOptions },
        {
          'px-2': !linkOptions,
        },
      )
    "
  >
    <slot />
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
