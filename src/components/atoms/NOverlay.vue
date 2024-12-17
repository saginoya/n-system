<script setup lang="ts">
import NTransitionFade from '@/components/atoms/NTransitionFade.vue'
</script>

<template>
  <NTransitionFade>
    <div
      class="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black/20 p-6 backdrop-blur-sm"
    >
      <slot />
    </div>
  </NTransitionFade>
</template>
