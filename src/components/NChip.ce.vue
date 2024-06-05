<script setup lang="ts">
import { useLinkComp } from '@/utils/useLinkComp'
import { useColor } from '@/composables/useColor'
import type { Color } from '@/types/color'

const props = defineProps<{
  color: Color
  href?: string
  type?: string
}>()

const { getLinkCompName } = useLinkComp()
const { bgColor } = useColor(props.color)
</script>

<template>
  <span class="rounded-full px-2 py-1 text-white" :class="bgColor">
    <component :is="getLinkCompName(type)" :href="href"> <slot /></component>
  </span>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
