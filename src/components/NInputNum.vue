<script setup lang="ts">
type AttributesInputNum = {
  name: string
  title?: string
  placeholder?: string
  form?: string
  list?: string
  readonly?: boolean
  max?: number
  min?: number
  step?: number
}

defineProps<AttributesInputNum>()

const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="title" :for="name" class="font-bold">{{ title }}</label>
    <input
      type="number"
      :id="name"
      :name
      :list
      :max
      :min
      :placeholder
      :readonly
      :step
      inputmode="numeric"
      class="w-full max-w-xs rounded border-2 border-gray-300 px-2 py-1 text-lg"
      v-model="model"
    />
    <slot />
  </div>
</template>

<style>
@import url(../assets/css/main.css);
</style>
