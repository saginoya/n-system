<script setup lang="ts">
import { computed } from 'vue'

import TooltipBase from '@/components//parts/TooltipBase.vue'
import { useLang } from '@/composables/useLang'
import { textColorMap } from '@/styles'
import type { Color } from '@/types'
import { iconMap } from '@/utils'

const props = withDefaults(
  defineProps<{
    active: boolean
    color?: Color
  }>(),
  {
    color: 'primary',
    lang: 'ja',
  },
)

const avtiveClass = [textColorMap[props.color]]
const defaultClass = ['text-gray-300']

const classState = computed(() => {
  return props.active ? avtiveClass : defaultClass
})

const IconBookmark = iconMap['bookmark']

const { lang } = useLang()
const textMap = {
  ja: {
    active: 'お気に入り解除',
    inactive: 'お気に入り登録',
  },
  en: {
    active: 'Remove from favorites',
    inactive: 'Add to Favorites',
  },
}
</script>

<template>
  <TooltipBase>
    <button
      type="button"
      class="inline-flex size-8 items-center justify-center rounded-full bg-slate-50"
      :class="classState"
    >
      <IconBookmark
        class="text-xl transition-transform duration-100 ease-in-out active:scale-125"
      />
    </button>
    <template v-slot:text> {{ textMap[lang][active ? 'active' : 'inactive'] }} </template>
  </TooltipBase>
</template>
