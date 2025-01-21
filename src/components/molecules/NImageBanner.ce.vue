<script setup lang="ts">
import NImage from '@/components/molecules/NImage.ce.vue'
import { useLink } from '@/utils/useLink'
import type { LinkType } from '@/types/link'
import type { Image } from '@/types/image'

const props = defineProps<
  Image & {
    href?: string
    type?: LinkType
  }
>()

const { linkTarget, linkIcon } = useLink()

const icon = props.type ? linkIcon(props.type) : undefined
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href ? href : null"
    :target="href ? (type ? linkTarget(type) : '_self') : null"
    class="relative inline-block w-fit max-w-full"
    :class="href ? 'hover:opacity-60' : undefined"
  >
    <NImage :src :alt :width :height></NImage>
    <div v-if="icon" class="absolute left-0 top-0 flex size-full items-center justify-end">
      <span class="rounded-l-full bg-info py-2 pl-1.5 text-white">
        <component :is="icon" class="size-6" />
      </span>
    </div>
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
