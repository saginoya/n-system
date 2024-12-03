import { ref } from 'vue'
import { useLocalStorage } from '@/utils/useLocalStorage'

import type { Ref } from 'vue'
import type { FormFields } from '@/types/formField'

export const useFormFieldsStoredData = (storageKey: string, formFields: Ref<FormFields>) => {
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

  // ローカルストレージ操作関数の読み込み
  const { set, get } = useLocalStorage(storageKey)

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

  return {
    saveFormFields,
    loadFormFields,
    setLocalStorageToStoredData
  }
}
