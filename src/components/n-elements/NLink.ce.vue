<script setup lang="ts">
import { linkManager, type LinkProps } from '@/composables/useLinkManager'

const props = defineProps<LinkProps>()

const linkOptions = linkManager({ href: props.href, type: props.type, routerId: props.routerId })
</script>

<template>
  <a
    v-if="linkOptions"
    :href="linkOptions.href"
    :target="linkOptions.target"
    class="inline-flex items-center justify-center gap-0.5 border-b border-b-current hover:bg-blue-200/30 focus:bg-blue-200/30"
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
