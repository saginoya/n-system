<script setup lang="ts">
import type { FormFieldNumber } from '@/types/formField'

defineProps<FormFieldNumber>()

const model = defineModel<string>()
</script>

<template>
  <input
    type="number"
    :name
    :max
    :min
    :placeholder
    :readonly
    :step
    inputmode="numeric"
    v-model="model"
    class="w-full max-w-xs rounded border-2 border-gray-300 px-2 py-1 text-lg"
  />
</template>
