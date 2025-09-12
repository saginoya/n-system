<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import { cn } from '@/lib/cn'

withDefaults(
  defineProps<{
    datalist?: string[]
    placeholder?: string
    className?: string
  }>(),
  {
    placeholder: 'キーワードで検索',
  },
)

const model = defineModel<string>()
</script>

<template>
  <form
    action="#"
    :class="
      cn(
        'max-w-full overflow-hidden rounded-full border-2 bg-white has-[input:focus-within]:border-info',
        className,
      )
    "
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
