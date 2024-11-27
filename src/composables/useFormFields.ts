import { ref } from 'vue'
import { useLocalStorage } from '@/utils/useLocalStorage'

import type { FormFields } from '@/types/formField'

export const useFormFields = (storageKey: string, initFormFields: FormFields) => {
  const formFields = ref<FormFields>(initFormFields)

  // ローカルストレージ操作関数の読み込み
  const { set, get } = useLocalStorage(storageKey)

  // ローカルストレージにformFieldsを保存する関数
  const saveFormFields = () => {
    const formData = JSON.stringify(formFields.value)
    set(formData)
    alert('フォームの内容が保存されました')
  }

  // ローカルストレージからformFieldsを読み込む関数
  const loadFormFields = () => {
    const storedData = get()
    if (storedData) {
      formFields.value = JSON.parse(storedData)
    }
  }

  // フォームフィールドの値を更新する関数
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
