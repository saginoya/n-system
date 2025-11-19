<script setup lang="ts">
import { computed } from 'vue'

import NImage from '@/components/entries/parts/NImage.ce.vue'
import { linkManager } from '@/composables/useLinkManager'
import { usePublishedState } from '@/composables/usePublishedState'
import type { PublishedState, RouterLinkProps } from '@/types'

const props = withDefaults(
  defineProps<
    {
      src: string
      alt: string
      width: number
      height: number
      noIcon?: boolean
      state?: PublishedState
    } & RouterLinkProps
  >(),
  {
    noIcon: false,
  },
)

const { linkOptions } = linkManager({
  href: props.href,
  type: props.type,
  routerId: props.routerId,
})

// 状態管理の初期化を即時実行関数で分離
const { isPreparation, setPublishedState, isClosing } = usePublishedState()
;(() => {
  if (props.state) {
    setPublishedState(props.state)
  }
})()

// リンク関連のロジック
const isLink = computed(() => {
  return Boolean(props.href) && !isPreparation.value && !isClosing.value
})
</script>

<template>
  <component
    :is="isLink ? 'a' : 'span'"
    :href="linkOptions ? linkOptions.href : null"
    :target="linkOptions ? linkOptions.target : null"
    class="group relative inline-block w-fit max-w-full"
  >
    <!-- 画像コンポーネント -->
    <NImage :src="src" :alt="alt" :width="width" :height="height" />

    <!-- ホバー時の表示 -->
    <div
      class="absolute left-0 top-0 flex size-full items-center justify-center opacity-0"
      :class="{
        'group-hover:bg-blue-200/20 group-hover:opacity-100 group-focus:bg-blue-200/20 group-focus:opacity-100':
          isLink,
      }"
    >
      <!-- アイコン表示 -->
      <span v-if="linkOptions && !noIcon" class="rounded-full bg-blue-500/80 p-2 text-white">
        <component :is="linkOptions.icon" class="size-6" />
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
