<script setup lang="ts">
import type { LinkType } from '@/types'
import { formatDate, getDocumentLanguage, getLinkOptions } from '@/utils'

const props = defineProps<{
  datetime: string
  href?: string
  type?: LinkType
}>()

const linkOptions = getLinkOptions(props.href, props.type)

const formattedDate = formatDate(props.datetime)
const { year, month, date } = formattedDate || { year: '', month: '', date: '' }

const labelTimeJa = `${year}年${month}月${date}日`
const labelTimeEn = `${year}-${month}-${date}`
const labelTime = getDocumentLanguage() === 'ja' ? labelTimeJa : labelTimeEn
</script>

<template>
  <li class="grid grid-cols-1 items-center border-b sm:grid-cols-4 md:grid-cols-6">
    <time :datetime class="p-2 font-bold md:p-4">
      {{ labelTime }}
    </time>
    <span v-if="!linkOptions.isLink" class="p-2 sm:col-span-3 md:col-span-5 md:p-4">
      <slot />
    </span>
    <a
      v-else
      :href="linkOptions.href"
      :target="linkOptions.target"
      class="flex items-center justify-between p-2 text-inherit hover:bg-blue-200/30 focus:bg-blue-200/30 sm:col-span-3 md:col-span-5 md:p-4"
    >
      <span>
        <slot />
      </span>
      <component :is="linkOptions.icon" class="inline" />
    </a>
  </li>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
