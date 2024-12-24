<script setup lang="ts">
import { watchEffect } from 'vue'
import { useValidationMultiSelect } from '@/composables/useValidationMultiSelect'
import { useValueList } from '@/composables/useValueList'

import NInputWrapper from '@/components/atoms/NInputWrapper.ce.vue'
import NInputCheckbox from '@/components/atoms/NInputCheckbox.vue'
import NContainerFlex from '@/components/atoms/NContainerFlex.ce.vue'
import NInputStatus from '@/components/molecules/NInputStatus.vue'

type OptionProps = {
  value: string
  label?: string
  disabled?: boolean
}

const props = defineProps<{
  name: string
  options: OptionProps[]
  title?: string
  required?: boolean
  maxlength?: number
}>()

const emits = defineEmits<{ validated: [result: boolean] }>()

const model = defineModel<string[]>({
  default: () => []
})

// 配列とそれを操作する関数
const { hasValue, addValue, removeValue } = useValueList(model)

const { required, maxlength } = props
const { errors, isValid, validate } = useValidationMultiSelect({ required, maxlength })

watchEffect(() => {
  validate(model.value)
  emits('validated', isValid.value)
})
</script>

<template>
  <NInputWrapper :title="title || name" :required="required">
    <NContainerFlex>
      <NInputCheckbox
        v-for="option in options"
        :key="option.value"
        :name="name"
        :value="option.value"
        v-model="model"
        @change="hasValue(option.value) ? addValue(option.value) : removeValue(option.value)"
      >
        {{ option.label || option.value }}
      </NInputCheckbox>
    </NContainerFlex>
    <NInputStatus :is-valid="isValid" :errors :value="model" :maxlength></NInputStatus>
    <slot />
  </NInputWrapper>
</template>
