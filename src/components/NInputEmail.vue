<script setup lang="ts">
import type { FormField } from '@/types/formField'

withDefaults(defineProps<FormField>(), {
  autocomplete: 'email',
  placeholder: 'sample@sample.com',
  pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
})

const model = defineModel<string>()
</script>

<template>
  <input
    type="email"
    :name
    :required
    :disabled
    :form
    :readonly
    :autocomplete
    inputmode="email"
    :placeholder
    :pattern
    v-model="model"
    class="w-full max-w-2xl rounded border-2 border-gray-300 px-2 py-1 text-lg"
  />
</template>
