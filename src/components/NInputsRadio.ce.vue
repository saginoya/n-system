<script setup lang="ts">
const props = defineProps<{
  name: string
  values: string
  title?: string
  required?: boolean
  checked?: number
}>()

const valueList = props.values.split(',')
</script>

<template>
  <div class="flex flex-col gap-1">
    <p v-if="title" class="font-bold">{{ title }}</p>
    <label v-for="(value, index) in valueList" :key="index">
      <input
        type="radio"
        id="radio"
        :name="name"
        :value="value"
        :checked="index === checked"
        :required="required && index === 1"
      />
      {{ value }}
    </label>
    <!--     <div class="min-h-6">
      <n-msg-check v-if="isValidation"></n-msg-check>
      <n-msg-warning v-else>{{ validationMsg }}</n-msg-warning>
    </div> -->
    <slot />
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
