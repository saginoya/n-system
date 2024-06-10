<script setup lang="ts">
import NLink from '@/components/NLink.ce.vue'
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
  <span class="inline-block overflow-hidden rounded-full" :class="bgColor(color)">
    <n-link v-if="href" :href="href" :type="type || 'internal'" class="text-white">
      <slot
    /></n-link>
    <span v-else class="inline-block px-3 py-1 text-white">
      <slot />
    </span>
  </span>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
