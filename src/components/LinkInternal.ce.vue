<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>

<template>
  <a :href="href"><slot /></a>
</template>
