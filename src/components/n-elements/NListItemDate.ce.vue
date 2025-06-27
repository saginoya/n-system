<script setup lang="ts">
import LinkBox from '@/components/parts/LinkBox.vue'
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

const commonClasses = 'p-2 sm:col-span-3 md:col-span-5 md:p-4 text-inherit'
</script>

<template>
  <li class="grid grid-cols-1 items-center border-b sm:grid-cols-4 md:grid-cols-6">
    <time :datetime class="p-2 font-bold md:p-4">
      {{ labelTime }}
    </time>
    <span v-if="!linkOptions.isLink" :class="commonClasses">
      <slot />
    </span>
    <LinkBox
      v-else
      :href="linkOptions.href"
      :target="linkOptions.target"
      :icon="linkOptions.icon"
      :class="commonClasses"
    >
      <slot />
    </LinkBox>
  </li>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
