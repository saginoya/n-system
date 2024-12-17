<script setup lang="ts">
import NLink from '@/components/atoms/NLink.ce.vue'
import { useColorStyle } from '@/utils/useColorStyle'
import type { Color } from '@/types/color'
import type { LinkType } from '@/types/link'

defineProps<{
  color: Color
  href?: string
  type?: LinkType
}>()

const { bgColor } = useColorStyle()
</script>

<template>
  <span class="inline-block overflow-hidden rounded-full align-middle" :class="bgColor(color)">
    <n-link v-if="href" :href="href" :type="type || 'internal'" class="text-white">
      <slot />
    </n-link>
    <span v-else class="inline-flex items-center justify-center px-3 py-1 align-middle text-white">
      <slot />
    </span>
  </span>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
