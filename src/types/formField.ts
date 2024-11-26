export type FormField = {
  type: string
  name: string
  value?: string
  required?: boolean
  id?: string
  title?: string
  form?: string
  list?: string
  placeholder?: string
  pattern?: string
  readonly?: boolean
  disabled?: boolean
  isabled?: boolean
  autocomplete?:
    | 'name'
    | 'username'
    | 'family-name'
    | 'given-name'
    | 'new-password'
    | 'current-password'
    | 'email'
    | 'tel'
    | 'postal-code'
    | 'address-level1'
    | 'address-level2'
    | 'address-line1'
    | 'address-line2'
    | 'organization'
    | 'organization-title'
    | 'off'
  inputmode?: 'text' | 'email' | 'url' | 'decimal' | 'numeric' | 'tel'
}

export type FormFieldText = FormField & {
  maxlength?: number
}

export type FormFieldNumber = FormField & {
  min?: number
  max?: number
  step?: number
}

export type FormFieldRadio = FormField & {
  checked?: boolean
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
