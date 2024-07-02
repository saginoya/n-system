<script setup lang="ts">
import NImage from './NImage.ce.vue'
import type { Link } from '@/types/link'

defineProps<{
  image: string
  width: number
  height: number
  nav?: Link[]
}>()
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <div class="relative max-w-screen-lg">
      <n-image :width="width" :height="height" :src="image" alt="" cover></n-image>
      <div v-if="nav" class="absolute bottom-0 right-0 flex gap-1 px-1 py-2">
        <n-chip
          v-for="(link, index) in nav"
          color="info"
          :key="index"
          :href="link.path"
          :type="link.type"
        >
          {{ link.name }}
        </n-chip>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
