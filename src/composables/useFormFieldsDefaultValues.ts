import type { FormField, FormFields } from '@/types/formField'

/**
 * FormFieldsにデフォルト値を適用するための関数
 */
export const useFormFieldsDefaultValues = () => {
  type DefaultFieldsTypes = 'email' | 'postal-code' | 'tel' | 'url'
  type DefaultField = {
    pattern: string
    autocomplete: string
    placeholder: string
  }

  const isDefaultFieldType = (type: string): type is DefaultFieldsTypes => {
    return Object.keys(defaultFields).includes(type)
  }

  const defaultFields: Record<DefaultFieldsTypes, DefaultField> = {
    email: {
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
      autocomplete: 'email',
      placeholder: 'sample@sample.com'
    },
    'postal-code': {
      pattern: '^[0-9]{3}-?[0-9]{4}$',
      autocomplete: 'postal-code',
      placeholder: '101-0061'
    },
    tel: {
      pattern: '\\d{2,4}-?\\d{2,4}-?\\d{4}',
      autocomplete: 'tel',
      placeholder: '03-3262-3462'
    },
    url: {
      pattern: 'https?://.*',
      autocomplete: 'url',
      placeholder: 'https://www.nippo.co.jp/'
    }
  }

  const getFormFieldDefaultValues = (formField: FormField): FormField => {
    const obj = formField
    const currentType = formField.type
    if (!isDefaultFieldType(currentType)) return obj

    const defaultKeys = ['pattern', 'autocomplete', 'placeholder'] as const
    defaultKeys.forEach((key) => {
      if (!(key in obj)) {
        obj[key] = defaultFields[currentType][key]
      }
    })

    return obj
  }

  const getFormFieldsDefaultValues = (formFields: FormFields): FormFields => {
    for (const key in formFields) {
      getFormFieldDefaultValues(formFields[key])
    }

    return formFields
  }

  return {
    getFormFieldsDefaultValues
  }
}
