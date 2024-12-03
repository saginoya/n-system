import { ref } from 'vue'
import { useFormFieldsStoredData } from '@/composables/useFormFieldsStoredData'
import { useFormFieldsDefaultValues } from './useFormFieldsDefaultValues'

import type { FormFields } from '@/types/formField'

export const useFormFields = (storageKey: string, initFormFields: FormFields) => {
  const { getFormFieldsDefaultValues } = useFormFieldsDefaultValues()

  const formFields = ref<FormFields>(getFormFieldsDefaultValues(initFormFields))

  const { saveFormFields, loadFormFields } = useFormFieldsStoredData(storageKey, formFields)

  // フォームフィールドのValueを更新する関数
  const updateFormFieldValue = (fieldId: string, value: string) => {
    if (formFields.value[fieldId]) {
      formFields.value[fieldId].value = value
    }
  }

  return {
    formFields,
    saveFormFields,
    loadFormFields,
    updateFormFieldValue
  }
}
