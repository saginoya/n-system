<script setup lang="ts">
import type { FormField } from '@/types/formField'

defineProps<FormField>()

const model = defineModel<string>()
</script>

<template>
  <input
    type="tel"
    :name
    :required
    :disabled
    :form
    :readonly
    :autocomplete
    inputmode="tel"
    :placeholder
    :pattern
    v-model="model"
    class="w-full max-w-xs rounded border-2 border-gray-300 px-2 py-1 text-lg"
  />
</template>
