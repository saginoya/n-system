<script setup lang="ts">
import NTransitionFade from '@/components/NTransitionFade.vue'
</script>

<template>
  <NTransitionFade>
    <div
      class="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black/70 p-6"
    >
      <slot />
    </div>
  </NTransitionFade>
</template>
