<script setup lang="ts">
import { watch } from 'vue'

import IconSearch from '@/components/icons/IconSearch.vue'
import { convertFullWidthToHalfWidth, convertSymbolToHalfWidth } from '@/utils'

withDefaults(
  defineProps<{
    datalist?: string[]
    placeholder?: string
  }>(),
  {
    placeholder: 'キーワードで検索',
  },
)

const model = defineModel<string>()

watch(model, () => {
  model.value = convertSymbolToHalfWidth(convertFullWidthToHalfWidth(model.value))
})
</script>

<template>
  <form
    action="#"
    class="w-96 max-w-full overflow-hidden rounded-full border-2 has-[input:focus-within]:border-info"
  >
    <label class="flex items-center gap-2 pl-4 pr-2">
      <IconSearch class="flex-none text-xl" />
      <input
        type="search"
        class="grow border-none p-2 leading-none outline-none"
        v-model="model"
        list="search"
        :placeholder
        aria-label="キーワードを入力"
      />
    </label>

    <datalist v-if="datalist" id="search">
      <option v-for="(item, index) in datalist" :key="index" :value="item"></option>
    </datalist>
  </form>
</template>
