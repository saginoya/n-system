<script setup lang="ts">
defineProps<{
  titleList: string[]
}>()
</script>

<template>
  <h1 class="m-0 border-b border-b-current pb-4 tracking-normal">
    <span v-for="(title, index) in titleList" :key="index" class="inline-block px-1">
      {{ title }}
    </span>
  </h1>
</template>
