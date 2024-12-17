<script setup lang="ts">
import { watchEffect } from 'vue'
import { useValidation } from '@/composables/useValidation'
import { useInputComps } from '@/utils/useInputComps'

import NInputWrapper from '@/components/atoms/NInputWrapper.ce.vue'
import NInputStatus from '@/components/molecules/NInputStatus.vue'

import type {
  FormField,
  FormFieldText,
  FormFieldNumber,
  FormFieldTextarea
} from '@/types/formField'

const props = defineProps<{
  formField: FormField | FormFieldText | FormFieldNumber | FormFieldTextarea
}>()
const { type, required, pattern, title, name, placeholder } = props.formField

const maxlength = (props.formField as FormFieldText | FormFieldTextarea).maxlength ?? undefined

const minlength = (props.formField as FormFieldTextarea).minlength ?? undefined

const emits = defineEmits<{ validated: [result: boolean] }>()

const model = defineModel<string>()

const { errors, isValid, validate } = useValidation({ required, pattern, maxlength, minlength })
const { getInputComp } = useInputComps()
watchEffect(() => {
  validate(model.value)
  emits('validated', isValid.value)
})
</script>

<template>
  <NInputWrapper :title="title || name" :required="required">
    <div class="flex flex-col gap-0.5">
      <component :is="getInputComp(type)" v-model="model" v-bind="formField" />
      <NInputStatus
        :is-valid="isValid"
        :errors
        :value="model"
        :maxlength
        :minlength
        :placeholder
      ></NInputStatus>
      <slot />
    </div>
  </NInputWrapper>
</template>
