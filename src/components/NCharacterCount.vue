<script setup lang="ts">
defineProps<{
  value?: string
  maxlength?: number
  minlength?: number
}>()
</script>

<template>
  <div>
    <span>{{ value?.length || 0 }}</span>
    <span v-show="maxlength"> / {{ maxlength }}</span>
    <span v-show="minlength"> ({{ minlength }}文字以上)</span>
  </div>
</template>
