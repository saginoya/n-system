export type AttributesInput = {
  name: string
  title?: string
  required?: boolean
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
  placeholder?: string
  disabled?: boolean
  form?: string
  list?: string
  pattern?: string
  readonly?: boolean
  inputmode?: 'text' | 'email' | 'url' | 'decimal' | 'numeric' | 'tel'
}
