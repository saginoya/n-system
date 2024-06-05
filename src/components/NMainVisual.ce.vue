<script setup lang="ts">
import type { Link } from '@/types/link'
import type { Image } from '@/types/image'

defineProps<{
  nav: Link[]
  image: Image
}>()
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <n-image
        :width="image.width"
        :height="image.height"
        :src="image.src"
        :alt="image.alt"
      ></n-image>
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
