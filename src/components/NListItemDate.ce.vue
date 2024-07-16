<script setup lang="ts">
import { useDateFormat } from '@/utils/useDateFormat'

const props = defineProps<{
  datetime: string
}>()

const { year, month, date } = useDateFormat(props.datetime)

const LabelTime = `${year}年${month}月${date}日`
</script>

<template>
  <li class="grid grid-cols-1 border-b p-2 sm:grid-cols-4 md:grid-cols-6 md:p-4">
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
