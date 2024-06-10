<script setup lang="ts">
import { useDateFormat } from '@/utils/useDateFormat'

const props = defineProps<{
  datetime: string
}>()

const { dateFormatParts } = useDateFormat()
const times = dateFormatParts(props.datetime)

const LabelTime = `${times.year}年${times.month}月${times.date}日`
</script>

<template>
  <li class="grid grid-cols-1 px-4 py-2 sm:grid-cols-4 md:grid-cols-6">
    <time :datetime class="font-bold">
      {{ LabelTime }}
    </time>
    <span class="sm:col-span-3 md:col-span-5">
      <slot />
    </span>
  </li>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
