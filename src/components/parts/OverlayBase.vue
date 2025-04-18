<script setup lang="ts">
import TransitionFade from '@/components/parts/TransitionFade.vue'
</script>

<template>
  <TransitionFade>
    <div
      class="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black/20 p-6 backdrop-blur-sm"
    >
      <slot />
    </div>
  </TransitionFade>
</template>
