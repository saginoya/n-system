<script setup lang="ts">
const props = defineProps<{
  items?: string
}>()

const itemList: string[] = props.items ? props.items.split(',') : []
</script>

<template>
  <ul class="list-decimal pl-6 [&>li]:py-0.5">
    <li v-for="(item, index) in itemList" :key="index">
      {{ item }}
    </li>
    <slot />
  </ul>
</template>

<style>
@import url(../assets/css/main.css);
</style>
