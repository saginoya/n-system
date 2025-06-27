<script setup lang="ts">
import { cn } from '@/lib/cn'
import type { LinkTarget } from '@/types'

import type { Component } from 'vue'

const props = defineProps<{
  href: string
  target: LinkTarget
  icon: Component
  class?: string
}>()

const commonClasses = 'flex items-center justify-between'
</script>

<template>
  <a
    :href
    :target
    :class="cn(commonClasses, 'hover:bg-blue-200/30 focus:bg-blue-200/30', props.class)"
  >
    <span>
      <slot />
    </span>
    <component :is="icon" class="inline" />
  </a>
</template>
