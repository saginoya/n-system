<script setup lang="ts">
import IconWarning from '@/components/icons/IconWarning.vue'
</script>

<template>
  <div class="flex items-center gap-2 text-warning">
    <IconWarning />
    <span><slot /></span>
  </div>
</template>
