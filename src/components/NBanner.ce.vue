<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorStyle } from '@/utils/useColorStyle'
import { useSizeStyle } from '@/utils/useSizeStyle'
import { useLink } from '@/utils/useLink'
import { useDeadline } from '@/utils/useDeadline'
import IconClock from '@/components/icons/IconClock.vue'
import type { Color } from '@/types/color'
import type { Size } from '@/types/size'
import type { LinkType } from '@/types/link'

const props = defineProps<{
  color: Color
  size: Size
  href?: string
  type?: LinkType
  state?: 'in-preparation' | 'default' | 'closing'
  deadline?: string
  revokeAutoDeadline?: boolean
}>()

const { bgColor, borderColor } = useColorStyle()
const { widthSize } = useSizeStyle()
const { linkTarget, linkIcon } = useLink()
const { isExpiration, format } = useDeadline(props.deadline)

const isInPreparation = ref<boolean>(props.state === 'in-preparation')
const isClosing = computed(() => {
  if (props.deadline && props.revokeAutoDeadline !== true) {
    return isExpiration()
  } else {
    return props.state === 'closing'
  }
})
const isDeadlineExtend = computed(() => {
  return props.revokeAutoDeadline === true && isExpiration()
})
const isLink = computed(() => {
  return props.href && !isInPreparation.value && !isClosing.value
})

type OverlayContent = {
  text: string
  class: string
}
const overlayContent = computed<OverlayContent | false>(() => {
  if (isInPreparation.value) {
    return {
      text: '準備中',
      class: 'bg-white/70 text-slate-700'
    }
  } else if (isClosing.value) {
    return {
      text: '締め切り',
      class: 'bg-black/50'
    }
  } else if (isDeadlineExtend.value) {
    return {
      text: `${format()} 締切（延長中）`,
      class: ''
    }
  } else if (props.deadline) {
    return {
      text: `${format()} 締切`,
      class: ''
    }
  } else {
    return false
  }
})
</script>

<template>
  <component
    :is="isLink ? 'a' : 'div'"
    class="group relative block max-w-full overflow-hidden rounded border-2 font-bold text-white"
    :class="[
      bgColor(color),
      borderColor(color),
      widthSize(size),
      { 'aspect-[4/1]': size !== 'free' }
    ]"
    :href="isLink ? href : null"
    :target="isLink ? (type ? linkTarget(type) : '_self') : null"
  >
    <div
      class="flex size-full items-center justify-center gap-1"
      :class="{ 'group-hover:bg-white/20 group-focus:bg-white/20': isLink }"
    >
      <slot />
      <component v-if="type" :is="linkIcon(type)" class="size-6" />
    </div>
    <div
      v-if="overlayContent"
      class="absolute left-0 top-0 flex size-full flex-col items-center justify-end"
      :class="overlayContent.class"
    >
      <div class="flex items-center">
        <IconClock v-if="deadline && !revokeAutoDeadline" />
        <span class="rounded px-2">{{ overlayContent.text }}</span>
      </div>
    </div>
  </component>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
