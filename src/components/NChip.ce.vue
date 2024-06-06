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
  <span class="inline-block overflow-hidden rounded-full" :class="bgColor">
    <component :is="getLinkCompName(type)" :href="href" class="text-white"> <slot /></component>
  </span>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
