import { ref, computed } from 'vue'

export const useValidation = () => {
  const errors = ref<string[]>([])
  const termsRequired = ref<boolean>(false)
  const termsPattern = ref<string | undefined>(undefined)

  const setTermsRequired = (enable: boolean): void => {
    termsRequired.value = enable
  }
  const setTermsPattern = (terms?: string): void => {
    termsPattern.value = terms
  }

  const isValidate = computed(() => {
    return errors.value.length === 0
  })

  const validateRequired = (value: string | undefined): boolean => {
    if (value === '' || value === undefined) {
      errors.value.push('必須項目です')
      return false
    } else {
      return true
    }
  }

  const validatePattern = (value: string | undefined, pattern: string): boolean => {
    // バリューが空の場合は早期リターン
    if (value === '' || value === undefined) {
      return termsRequired.value ? false : true
    }

    if (!value.match(pattern)) {
      errors.value.push('形式が不正です')
      return false
    } else {
      return true
    }
  }

  const validate = (value: string | undefined) => {
    errors.value = []
    if (termsRequired.value) {
      validateRequired(value)
    }

    if (termsPattern.value) {
      validatePattern(value, termsPattern.value)
    }
  }

  return {
    errors,
    isValidate,
    setTermsRequired,
    setTermsPattern,
    validate
  }
}
