<script setup lang="ts">
import { watchEffect } from 'vue'
import NMsgCheck from '@/components/NMsgCheck.vue'
import NMsgWarning from '@/components/NMsgWarning.vue'
import { useValidation } from '@/composables/useValidation'

import type { FormField } from '@/types/formField'

const props = defineProps<
  FormField & {
    values: string
    labels?: string
    checked?: number
  }
>()

const emits = defineEmits<{ validated: [result: boolean] }>()

const valueList: string[] = props.values.split(',')
const labelList: string[] | undefined = props.labels?.split(',')

const model = defineModel<string>()

const { errors, isValidate, setTermsRequired, validate } = useValidation()
setTermsRequired(props.required)
watchEffect(() => {
  validate(model.value)
  emits('validated', isValidate.value)
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
      <NMsgCheck v-if="isValidate"></NMsgCheck>
      <NMsgWarning v-else>{{ errors[0] }}</NMsgWarning>
    </div>
    <slot />
  </div>
</template>
