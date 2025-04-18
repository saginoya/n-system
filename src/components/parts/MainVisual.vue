<script setup lang="ts">
import NImage from '@/components/n-elements/NImage.ce.vue'
import type { Link, Image } from '@/types'

defineProps<{
  image: Image
  nav?: Link[]
}>()
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <div class="relative max-w-screen-lg">
      <n-image
        :width="image.width"
        :height="image.height"
        :src="image.src"
        :alt="image.alt"
        cover
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
