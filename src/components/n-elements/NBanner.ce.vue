<script setup lang="ts">
import type { Color, LinkType, PublishedState } from '@/types'

import { computed } from 'vue'
import { usePublishedState } from '@/composables/usePublishedState'
import { variantConceptMap, Variant } from '@/styles'
import { getLinkTarget, linkIconMap, formatDate } from '@/utils'
import { cn } from '@/lib/cn'

import IconClock from '@/components/icons/IconClock.vue'

const props = withDefaults(
  defineProps<{
    color: Color
    size: Size
    href?: string
    type?: LinkType
    state?: PublishedState
    deadline?: string
    revokeAutoDeadline?: boolean
    variant?: Variant
    note?: string
  }>(),
  {
    variant: 'flat',
  },
)

const {
  isPreparation,
  isClosing,
  isExpiration,
  setPublishedState,
  setDeadline,
  revokeAutoDeadline: revokeAutoDeadlineFn,
} = usePublishedState()

if (props.state) {
  setPublishedState(props.state)
}
if (props.deadline) {
  setDeadline(props.deadline)
}
if (props.revokeAutoDeadline === true) {
  revokeAutoDeadlineFn()
}

const isLink = computed(() => {
  return props.href && !isPreparation.value && !isClosing.value
})

type OverlayContent = {
  text: string
  class: string
}
const overlayContent = computed<OverlayContent | false>(() => {
  if (isPreparation.value) {
    return {
      text: '準備中',
      class: 'bg-white/70 text-slate-700',
    }
  } else if (isClosing.value) {
    return {
      text: '締切ました',
      class: 'bg-black/50',
    }
  } else if (isExpiration.value) {
    return {
      text: `${deadlineFormat()} 締切（延長中）`,
      class: '',
    }
  } else if (props.deadline) {
    return {
      text: `${deadlineFormat()} 締切`,
      class: '',
    }
  } else {
    return false
  }
})

const deadlineFormat = (): string | undefined => {
  if (!props.deadline) return undefined
  const formattedDate = formatDate(props.deadline)
  const { year, month, date, twoDigitHour, twoDigitMinutes } = formattedDate || {
    year: '',
    month: '',
    date: '',
    twoDigitHour: '',
    twoDigitMinutes: '',
  }
  return `${year}年${month}月${date}日 ${twoDigitHour}:${twoDigitMinutes}`
}

const sizeMap = {
  xs: 'w-52 h-14',
  sm: 'w-64 h-16',
  md: 'w-72 h-20',
  lg: 'w-80 h-20',
  xl: 'w-96 h-24',
  free: 'w-fit h-fit',
  'w-full': 'w-full h-20',
} as const

type Size = keyof typeof sizeMap
</script>

<template>
  <component
    :is="isLink ? 'a' : 'div'"
    class="group relative block max-w-full overflow-hidden rounded border-2"
    :class="cn(sizeMap[size], variantConceptMap[variant](color))"
    :href="isLink ? href : null"
    :target="isLink ? (type ? getLinkTarget(type) : '_self') : null"
  >
    <div
      class="flex size-full flex-col items-center justify-center text-center leading-tight"
      :class="{ 'group-hover:bg-blue-200/20 group-focus:bg-blue-200/20': isLink }"
    >
      <div class="flex items-center gap-1 text-balance font-bold tracking-tight">
        <slot />
        <component v-if="type" :is="linkIconMap[type]" class="size-6" />
      </div>
      <p v-if="note" class="text-sm">{{ note }}</p>
    </div>
    <div
      v-if="overlayContent"
      class="absolute left-0 top-0 flex size-full flex-col items-center justify-end"
      :class="overlayContent.class"
    >
      <div class="flex items-center text-sm">
        <IconClock v-if="deadline && !revokeAutoDeadline" />
        <span class="rounded px-2">{{ overlayContent.text }}</span>
      </div>
    </div>
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
