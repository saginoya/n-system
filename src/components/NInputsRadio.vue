<script setup lang="ts">
import { watchEffect } from 'vue'
import { useValidation } from '@/composables/useValidation'

import type { FormField } from '@/types/formField'

const props = defineProps<
  FormField & {
    values: string
    labels?: string
    checked?: number
  }
>()

const valueList: string[] = props.values.split(',')
const labelList: string[] | undefined = props.labels?.split(',')

const model = defineModel<string>()

const { errors, isValidate, setTermsRequired, validate } = useValidation()
setTermsRequired(props.required)
watchEffect(() => {
  validate(model.value)
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <p v-if="title" class="font-bold">{{ title }}</p>
    <div class="flex gap-1">
      <label
        v-for="(value, index) in valueList"
        :key="index"
        class="rounded px-2 py-1 text-lg hover:bg-slate-100 focus:bg-slate-100"
      >
        <input
          type="radio"
          :id="id || name"
          :name="name"
          v-model="model"
          :value="value"
          :checked="index === checked"
          :required="required && index === 1"
        />
        {{ labelList ? labelList[index] || value : value }}
      </label>
    </div>
    <div class="min-h-4">
      <n-msg-check v-if="isValidate"></n-msg-check>
      <n-msg-warning v-else>{{ errors[0] }}</n-msg-warning>
    </div>
    <slot />
  </div>
</template>
