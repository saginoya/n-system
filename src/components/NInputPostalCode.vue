<script setup lang="ts">
import type { FormField } from '@/types/formField'

withDefaults(defineProps<FormField>(), {
  name: 'postal-code',
  autocomplete: 'postal-code',
  placeholder: '101-0061',
  pattern: '^[0-9]{3}-?[0-9]{4}$'
})

const model = defineModel<string>()
</script>

<template>
  <input
    type="text"
    :name
    :required
    :disabled
    :form
    :readonly
    :autocomplete
    inputmode="decimal"
    :placeholder
    :pattern
    v-model="model"
    class="w-full max-w-xs rounded border-2 border-gray-300 px-2 py-1 text-lg"
  />
</template>
