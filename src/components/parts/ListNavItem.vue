<script setup lang="ts">
import { cn } from '@/lib/cn'
import type { Link } from '@/types'
import { getLinkOptions } from '@/utils'

const props = defineProps<{
  link: Link
}>()

const linkOptions = getLinkOptions(props.link.path, props.link.type)

const commonClasses = 'flex items-center justify-between gap-0.5 px-2 py-0.5 font-bold rounded-lg'
</script>

<template>
  <a
    v-if="linkOptions.isLink"
    :href="linkOptions.href"
    :target="linkOptions.target"
    :class="cn(commonClasses, 'text-white hover:bg-blue-200/30 focus:bg-blue-200/30')"
  >
    {{ link.name }}
    <component :is="linkOptions.icon" />
  </a>
  <span v-else :class="cn(commonClasses, 'text-gray-400')">
    {{ link.name }}
  </span>
</template>
