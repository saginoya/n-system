import { ref } from 'vue'

export const useValidation = () => {
  const validationMsg = ref<string | undefined>()
  const isValidation = ref<boolean | undefined>()

  const validateCheck = (value: string, required: boolean, pattern?: string): void => {
    if (required && value === '') {
      validationMsg.value = '必須項目です'
      isValidation.value = false
    } else if (value !== '' && pattern && !value.match(pattern)) {
      validationMsg.value = '形式が正しくありません'
      isValidation.value = false
    } else {
      validationMsg.value = ''
      isValidation.value = true
    }
  }

  return {
    validationMsg,
    isValidation,
    validateCheck
  }
}
