<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/lib/cn'
import { chipChildBase } from '@/styles/concepts'
import type { LinkTarget, LinkType } from '@/types'
import { getLinkOptions } from '@/utils'

import type { Component } from 'vue'

type LinkBoxProps = {
  href: string
  target?: LinkTarget
  icon?: Component
  type?: LinkType
  class?: string
}

const props = withDefaults(defineProps<LinkBoxProps>(), {
  target: '_self', // デフォルト値
  icon: undefined,
  type: undefined,
  class: '',
})

const linkOptions = computed(() => {
  if (props.type) {
    return getLinkOptions(props.href, props.type)
  } else {
    return {
      href: props.href,
      target: props.target,
      icon: props.icon,
    }
  }
})
</script>

<template>
  <a
    :href="linkOptions.href"
    :target="linkOptions.target"
    :class="cn('flex items-center justify-between', props.class)"
  >
    <span :class="chipChildBase">
      <slot />
    </span>
    <component v-if="linkOptions.icon" :is="linkOptions.icon" class="inline" />
  </a>
</template>
