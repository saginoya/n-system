<script setup lang="ts"></script>

<template>
  <h2 class="text-center text-2xl sm:text-start">
    <slot />
  </h2>
</template>

<style>
@import '@/assets/css/web-component.css';

@layer base {
  h2 {
    @apply text-3xl font-bold tracking-tight text-slate-500 font-mono;
  }
}
</style>
