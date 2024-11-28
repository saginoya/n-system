<script setup lang="ts">
import type { FormFieldRadio } from '@/types/formField'

const props = defineProps<FormFieldRadio>()

const valueList: string[] = props.values.split(',')
const labelList: string[] | undefined = props.labels?.split(',')

const model = defineModel<string>()
</script>

<template>
  <div class="flex gap-1">
    <label
      v-for="(value, index) in valueList"
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
      {{ labelList ? labelList[index] || value : value }}
    </label>
  </div>
</template>
