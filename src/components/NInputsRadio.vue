<script setup lang="ts">
import type { FormFieldRadio } from '@/types/formField'

defineProps<FormFieldRadio>()

const model = defineModel<string>()
</script>

<template>
  <div class="flex gap-1">
    <label
      v-for="(value, index) in values"
      :key="index"
      class="rounded px-2 py-1 text-lg hover:bg-slate-100 focus:bg-slate-100"
    >
      <input
        type="radio"
        :name="name"
        v-model="model"
        :value="value"
        :checked="index === checked"
        :required="required && index === 1"
      />
      {{ labels ? labels[index] || value : value }}
    </label>
  </div>
</template>
