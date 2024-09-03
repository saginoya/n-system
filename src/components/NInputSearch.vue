<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'

const model = defineModel<string>()
</script>

<template>
  <label class="inline-flex items-center rounded-full border-2 px-3">
    <IconSearch class="text-xl" />
    <input type="search" class="border-0" v-model="model" />
  </label>
</template>
