<script setup lang="ts">
export type NInputCheckboxProps = {
  name: string
  value: string
  label?: string
  checked?: boolean
  disabled?: boolean
}

defineProps<NInputCheckboxProps>()

const model = defineModel<string[]>()

const defaultStyle = 'cursor-pointer rounded-full bg-gray-100 px-4 py-1 text-lg'
const hoverStyle = 'hover:bg-gray-200 focus:bg-gray-200'
const checkedStyle = 'has-[:checked]:bg-success has-[:checked]:text-white'
const disabledStyle = 'has-[:disabled]:cursor-default  has-[:disabled]:text-gray-300'
</script>

<template>
  <label :class="[defaultStyle, hoverStyle, checkedStyle, disabledStyle]">
    <input type="checkbox" :name :value :checked :disabled v-model="model" class="sr-only" />
    <slot>
      {{ label || value }}
    </slot>
  </label>
</template>
