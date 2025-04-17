<script setup lang="ts">
import { formatDate, getDocumentLanguage } from '@/utils'

const props = defineProps<{
  datetime: string
}>()

const formattedDate = formatDate(props.datetime)
const { year, month, date } = formattedDate || { year: '', month: '', date: '' }

const labelTimeJa = `${year}年${month}月${date}日`
const labelTimeEn = `${year}-${month}-${date}`
const labelTime = getDocumentLanguage() === 'ja' ? labelTimeJa : labelTimeEn
</script>

<template>
  <li class="grid grid-cols-1 items-center border-b p-2 sm:grid-cols-4 md:grid-cols-6 md:p-4">
    <time :datetime class="font-bold">
      {{ labelTime }}
    </time>
    <span class="sm:col-span-3 md:col-span-5">
      <slot />
    </span>
  </li>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
