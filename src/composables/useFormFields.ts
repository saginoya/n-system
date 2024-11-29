import { ref } from 'vue'
import { useLocalStorage } from '@/utils/useLocalStorage'

import type { FormFields } from '@/types/formField'

export const useFormFields = (storageKey: string, initFormFields: FormFields) => {
  const formFields = ref<FormFields>(initFormFields)

  // ローカルストレージに保存するためのデータ形式
  type StoredData = { [key: string]: string }
  const storedData = ref<StoredData>({})

  const clearStoredData = () => {
    storedData.value = {}
  }

  const setFormFieldsToStoredData = () => {
    clearStoredData()
    for (const key in formFields.value) {
      storedData.value[key] = formFields.value[key].value || ''
    }
  }

  const setStoredDataToFormFields = () => {
    if (storedData.value !== undefined) {
      for (const key in storedData.value) {
        formFields.value[key].value = storedData.value[key]
      }
    }
  }

  const setLocalStorageToStoredData = () => {
    const localStorage = get()
    if (localStorage) {
      storedData.value = JSON.parse(localStorage)
    }
  }

  // ローカルストレージ操作関数の読み込み
  const { set, get } = useLocalStorage(storageKey)

  // ローカルストレージにformFieldsを保存する関数
  const saveFormFields = () => {
    setFormFieldsToStoredData()
    const formData = JSON.stringify(storedData.value)
    set(formData)
    alert('フォームの内容が保存されました')
  }

  // ローカルストレージからformFieldsを読み込む関数
  const loadFormFields = () => {
    setLocalStorageToStoredData()
    setStoredDataToFormFields()
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
