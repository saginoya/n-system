<script setup lang="ts">
import { watch } from 'vue'
import { useTextFormatter } from '@/utils'
import IconSearch from '@/components/icons/IconSearch.vue'

defineProps<{
  datalist?: string[]
}>()

const model = defineModel<string>()

const { convertFullWidthToHalfWidth, convertFullWidthSymbolToHalfWidth } = useTextFormatter()

watch(model, () => {
  model.value = convertFullWidthSymbolToHalfWidth(convertFullWidthToHalfWidth(model.value))
})
</script>

<template>
  <label class="inline-flex w-96 max-w-full items-center rounded-full border-2 px-3">
    <IconSearch class="text-xl" />
    <input type="search" class="w-full border-0 leading-none" v-model="model" list="search" />
  </label>
  <datalist v-if="datalist" id="search">
    <option v-for="(item, index) in datalist" :key="index" :value="item"></option>
  </datalist>
</template>
