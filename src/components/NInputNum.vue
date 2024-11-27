<script setup lang="ts">
import type { FormFieldNumber } from '@/types/formField'

defineProps<FormFieldNumber>()

const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="title" :for="name" class="font-bold">{{ title }}</label>
    <input
      type="number"
      :id="id || name"
      :name
      :max
      :min
      :placeholder
      :readonly
      :step
      inputmode="numeric"
      class="w-full max-w-xs rounded border-2 border-gray-300 px-2 py-1 text-lg"
      v-model="model"
    />
    <slot />
  </div>
</template>
