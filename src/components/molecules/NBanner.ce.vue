<script setup lang="ts">
import { computed } from 'vue'
import { usePublishedState } from '@/composables/usePublishedState'
import { getStyles, widthSizeMap, heightSizeMap } from '@/styles'
import { getLinkTarget, linkIconMap, formatDate } from '@/utils'
import IconClock from '@/components/icons/IconClock.vue'
import type { Color, Variant, Size, LinkType, PublishedState } from '@/types'

const props = defineProps<{
  color: Color
  size: Size
  href?: string
  type?: LinkType
  state?: PublishedState
  deadline?: string
  revokeAutoDeadline?: boolean
  variant?: Variant
  note?: string
}>()

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
</script>

<template>
  <component
    :is="isLink ? 'a' : 'div'"
    class="group relative block max-w-full overflow-hidden rounded border-2"
    :class="[widthSizeMap[size], heightSizeMap[size], ...getStyles(color, variant)]"
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
