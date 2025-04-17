<script setup lang="ts">
defineProps<{
  header: string
  item1: string
  item2: string
}>()
</script>

<template>
  <li class="grid grid-cols-2 border-b sm:grid-cols-3 sm:divide-x [&>div]:p-2">
    <div class="col-span-2 bg-slate-100 font-bold sm:col-span-1">
      {{ header }}
    </div>
    <div class="border-r text-center sm:border-r-0">
      {{ item1 }}
    </div>
    <div class="text-center">
      {{ item2 }}
    </div>
  </li>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
