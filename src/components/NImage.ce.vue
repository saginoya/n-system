<script setup lang="ts">
defineProps<{
  width: number
  height: number
  src: string
  alt: string
  caption?: string
  cover: boolean
}>()
</script>

<template>
  <figure>
    <img
      :width="width"
      :height="height"
      loading="lazy"
      decoding="auto"
      :src="src"
      :alt="alt"
      class="h-auto max-w-full align-top"
      :class="{ 'object-cover': cover }"
    />
    <figcaption v-if="caption" class="leading-5" :style="{ 'max-width': width + 'px' }">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
