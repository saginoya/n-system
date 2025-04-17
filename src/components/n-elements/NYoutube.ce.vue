<script setup lang="ts">
defineProps<{
  src: string
  caption?: string
}>()
</script>

<template>
  <figure>
    <iframe
      :src="src"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="aspect-video h-auto w-full"
    ></iframe>
    <figcaption v-if="caption" class="text-sm">{{ caption }}</figcaption>
  </figure>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
