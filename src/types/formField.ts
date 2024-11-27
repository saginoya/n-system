export type FormField = {
  name: string
  title?: string
  id?: string
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

export type FormFields = {
  [key: string]: FormField
}
