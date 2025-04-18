<script setup lang="ts">
import TooltipBookmark from '@/components/parts/TooltipBookmark.vue'
import { useLang } from '@/composables/useLang'
import { borderColorMap, textColorMap } from '@/styles'
import type { Color } from '@/types'

withDefaults(
  defineProps<{
    name: string
    color?: Color
  }>(),
  {
    color: 'primary',
  },
)
const model = defineModel<boolean>()

const { lang } = useLang()
const text = {
  all: {
    ja: 'すべてを表示',
    en: 'Show All',
  },
  favorite: {
    ja: 'お気に入り登録のみを表示',
    en: 'Show only favorites',
  },
}
</script>

<template>
  <div
    class="inline-flex items-center rounded border-2 bg-slate-50 px-2 py-1"
    :class="[textColorMap[color], borderColorMap[color]]"
  >
    <TooltipBookmark :active="model || false" :color="color" />
    <select :name v-model="model" class="bg-inherit">
      <option :value="false">{{ text.all[lang] }}</option>
      <option :value="true">{{ text.favorite[lang] }}</option>
    </select>
  </div>
</template>
