export type TypeOfFormField =
  | 'email'
  | 'number'
  | 'postal-code'
  | 'radio'
  | 'sdgs'
  | 'tel'
  | 'text'
  | 'textarea'
  | 'url'

export type FormField = {
  type: TypeOfFormField
  name: string
  title?: string
  value?: string
  required?: boolean
  form?: string
  placeholder?: string
  pattern?: string
  readonly?: boolean
  disabled?: boolean
  autocomplete?: string
}

export type FormFieldText = FormField & {
  maxlength?: number
}

export type FormFieldNumber = FormField & {
  min?: number
  max?: number
  step?: number
}

export type FormFieldTextarea = FormField & {
  maxlength?: number
  minlength?: number
  rows?: number
  cols?: number
}

export type FormFieldRadio = FormField & {
  values: string[]
  labels?: string[]
  checked?: number
}

export type FormFields = {
  [key: string]: FormField | FormFieldText | FormFieldNumber | FormFieldTextarea | FormFieldRadio
}
