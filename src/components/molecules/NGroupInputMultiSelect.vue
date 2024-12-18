<script setup lang="ts">
import { watchEffect } from 'vue'
import { useValidationMultiSelect } from '@/composables/useValidationMultiSelect'

import NInputWrapper from '@/components/atoms/NInputWrapper.ce.vue'
import NInputMultiSelect from '@/components/molecules/NInputMultiSelect.vue'
import NInputStatus from '@/components/molecules/NInputStatus.vue'

import type { NInputMultiSelectProps } from '@/components/molecules/NInputMultiSelect.vue'

const props = defineProps<{
  name: string
  options: NInputMultiSelectProps[]
  title?: string
  required?: boolean
  maxlength?: number
}>()

const emits = defineEmits<{ validated: [result: boolean] }>()

const model = defineModel<string[]>()

const { required, maxlength } = props
const { errors, isValid, validate } = useValidationMultiSelect({ required, maxlength })

watchEffect(() => {
  validate(model.value)
  emits('validated', isValid.value)
})
</script>

<template>
  <NInputWrapper :title="title || name" :required="required">
    <div class="flex flex-col gap-0.5">
      <NInputMultiSelect :options v-model="model"></NInputMultiSelect>
      <NInputStatus :is-valid="isValid" :errors :value="model" :maxlength></NInputStatus>
      <slot />
    </div>
  </NInputWrapper>
</template>
