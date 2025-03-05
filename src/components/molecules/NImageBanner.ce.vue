<script setup lang="ts">
import { computed } from 'vue'
import NImage from '@/components/molecules/NImage.ce.vue'
import { useLink } from '@/utils/useLink'
import { usePublishedState } from '@/composables/usePublishedState'

import type { LinkType } from '@/types/link'
import type { PublishedState } from '@/types/publishedState'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    width: number
    height: number
    href?: string
    type?: LinkType
    noIcon?: boolean
    state?: PublishedState
  }>(),
  {
    noIcon: false,
  },
)

// 状態管理の初期化を即時実行関数で分離
const { isPreparation, setPublishedState, isClosing } = usePublishedState()
;(() => {
  if (props.state) {
    setPublishedState(props.state)
  }
})()

// リンク関連のロジック
const { linkTarget, linkIcon } = useLink()
const icon = computed(() => (props.type && !props.noIcon ? linkIcon(props.type) : undefined))
const isLink = computed(() => {
  return Boolean(props.href) && !isPreparation.value && !isClosing.value
})
</script>

<template>
  <component
    :is="isLink ? 'a' : 'span'"
    :href="isLink ? href : null"
    :target="isLink ? (type ? linkTarget(type) : '_self') : null"
    class="relative inline-block w-fit max-w-full"
    :class="{ 'hover:opacity-60': isLink }"
  >
    <!-- 画像コンポーネント -->
    <NImage :src="src" :alt="alt" :width="width" :height="height" />

    <!-- アイコン表示 -->
    <div v-if="icon" class="absolute left-0 top-0 flex size-full items-center justify-end">
      <span class="rounded-l-full bg-info py-2 pl-1.5 text-white">
        <component :is="icon" class="size-6" />
      </span>
    </div>

    <!-- 状態オーバーレイ -->
    <div
      v-if="isPreparation || isClosing"
      class="absolute left-0 top-0 size-full"
      :class="{
        'bg-white/70': isPreparation,
        'bg-black/50': isClosing,
      }"
    ></div>
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
