<script setup lang="ts">
import { useColorStyle } from '@/utils/useColorStyle'
import { useSizeStyle } from '@/utils/useSizeStyle'
import { useLink } from '@/utils/useLink'
import type { Color } from '@/types/color'
import type { Size } from '@/types/size'
import type { LinkType } from '@/types/link'

defineProps<{
  color: Color
  size: Size
  href?: string
  type?: LinkType
}>()

const { bgColor, borderColor } = useColorStyle()
const { widthSize } = useSizeStyle()
const { linkTarget, linkIcon } = useLink()
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="group relative block max-w-full overflow-hidden rounded border-2 font-bold text-white"
    :class="[
      bgColor(color),
      borderColor(color),
      widthSize(size),
      { 'aspect-[4/1]': size !== 'free' }
    ]"
    :href="href ? href : null"
    :target="href && type ? linkTarget(type) : '_self'"
  >
    <div
      class="flex size-full items-center justify-center gap-1"
      :class="[{ 'group-hover:bg-black/20': href }, { 'group-focus:bg-black/20': href }]"
    >
      <slot />
      <component v-if="type" :is="linkIcon(type)" />
    </div>
    <!--     <el-banner-overlay
      v-if="placeOn"
      :color="placeOnColor ? placeOnColor : 'white'"
      :center="placeOnCenter ? true : false"
    >
      <slot name="placeOn">
        {{ placeOn }}
      </slot>
    </el-banner-overlay> -->
  </component>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
