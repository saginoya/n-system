<script setup lang="ts">
import LinkBox from '@/components/ui/LinkBox.vue'
import { linkManager } from '@/composables/useLinkManager'
import { cn } from '@/lib/cn'
import type { RouterLinkProps } from '@/types'
import { formatDate, getDocumentLanguage } from '@/utils'

const props = defineProps<
  {
    header?: string
    datetime?: string
  } & RouterLinkProps
>()

const { linkOptions } = linkManager({
  href: props.href,
  type: props.type,
  routerId: props.routerId,
})

const formattedDate = props.datetime ? formatDate(props.datetime) : undefined
const { year, month, date } = formattedDate || { year: '', month: '', date: '' }

const labelTimeJa = `${year}年${month}月${date}日`
const labelTimeEn = `${year}-${month}-${date}`
const labelTime = getDocumentLanguage() === 'ja' ? labelTimeJa : labelTimeEn

const commonClasses = 'p-2 sm:col-span-3 md:col-span-5 md:p-4 text-inherit'
</script>

<template>
  <li class="grid grid-cols-1 border-b sm:grid-cols-4 md:grid-cols-6">
    <!-- 1列目 -->
    <div class="p-2 font-bold md:p-4">
      <time v-if="datetime" :datetime class="items-center">
        {{ labelTime }}
      </time>
      <slot name="header">{{ header }}</slot>
    </div>

    <!-- 2列目 -->
    <LinkBox
      v-if="linkOptions"
      :href="linkOptions.href"
      :target="linkOptions.target"
      :icon="linkOptions.icon"
      :class="cn(commonClasses, 'hover:bg-blue-200/30 focus:bg-blue-200/30')"
    >
      <slot />
    </LinkBox>

    <span v-else :class="commonClasses">
      <slot />
    </span>
  </li>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
