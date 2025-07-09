<script setup lang="ts">
import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
const props = defineProps<{
  items: string
}>()

const arr = props.items.split(',')
</script>

<template>
  <NContainerFlex>
    <span v-for="(item, index) in arr" :key="index" class="rounded bg-gray-200/50 px-2 py-0.5">
      {{ item }}
    </span>
  </NContainerFlex>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
