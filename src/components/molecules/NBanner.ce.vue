<script setup lang="ts">
import { computed } from 'vue'
import { usePublishedState } from '@/composables/usePublishedState'
import { useVariantStyle } from '@/utils/styleHelpers/useVariantStyle'
import { useSizeStyle } from '@/utils/styleHelpers/useSizeStyle'
import { useLink } from '@/utils/useLink'
import { useDateFormatter } from '@/utils/formatter/useDateFormatter'
import IconClock from '@/components/icons/IconClock.vue'
import type { Color } from '@/types/color'
import type { Variant } from '@/types/variant'
import type { Size } from '@/types/size'
import type { LinkType } from '@/types/link'
import type { PublishedState } from '@/types/publishedState'

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

const { getStyles } = useVariantStyle()
const { widthSize, heightSize } = useSizeStyle()
const { linkTarget, linkIcon } = useLink()

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
  const { year, month, date, twoDigitHour, twoDigitMinutes } = useDateFormatter(props.deadline)
  return `${year}年${month}月${date}日 ${twoDigitHour}:${twoDigitMinutes}`
}
</script>

<template>
  <component
    :is="isLink ? 'a' : 'div'"
    class="group relative block max-w-full overflow-hidden rounded border-2"
    :class="[widthSize(size), heightSize(size), ...getStyles(color, variant)]"
    :href="isLink ? href : null"
    :target="isLink ? (type ? linkTarget(type) : '_self') : null"
  >
    <div
      class="flex size-full flex-col items-center justify-center text-center leading-tight"
      :class="{ 'group-hover:bg-blue-200/20 group-focus:bg-blue-200/20': isLink }"
    >
      <div class="flex items-center gap-1 text-balance font-bold tracking-tight">
        <slot />
        <component v-if="type" :is="linkIcon(type)" class="size-6" />
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
