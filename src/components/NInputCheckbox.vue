<script setup lang="ts">
defineProps<{
  name: string
  value: string
  checked?: boolean
}>()

const model = defineModel<boolean>()
</script>

<template>
  <label class="rounded px-2 py-1 text-lg hover:bg-slate-100 focus:bg-slate-100">
    <input type="checkbox" :name :value :checked v-model="model" />
    <slot />
  </label>
</template>
