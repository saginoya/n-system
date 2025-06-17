<script setup lang="ts">
import type { LinkType } from '@/types'
import { getLinkOptions } from '@/utils'

const props = defineProps<{
  href: string
  type: LinkType
  block?: boolean
}>()

const displayStyle = props.block ? 'flex' : 'inline-flex'

const linkOptions = getLinkOptions(props.href, props.type)
</script>

<template>
  <a
    v-if="linkOptions.isLink"
    :href="linkOptions.href"
    :target="linkOptions.target"
    class="items-center justify-center gap-0.5 border-b border-b-current hover:bg-blue-200/30 focus:bg-blue-200/30"
    :class="displayStyle"
  >
    <span>
      <slot />
    </span>
    <component :is="linkOptions.icon" class="inline" />
  </a>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
