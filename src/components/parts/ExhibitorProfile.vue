<script setup lang="ts">
import NChip from '@/components/n-elements/NChip.ce.vue'
import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
import NLink from '@/components/n-elements/NLink.ce.vue'
import MarkupText from '@/components/parts/MarkupText.vue'
import SDGsIcons from '@/components/parts/SDGsIcons.vue'
import TooltipBookmark from '@/components/parts/TooltipBookmark.vue'
import type { Lang, SDGs, Color } from '@/types'

defineProps<{
  lang: Lang
  id: string
  name: string
  koma: string
  exhibition: string
  isFavorite: boolean
  subName?: string
  genre?: string
  webSite?: string
  contents?: string
  sdgs?: SDGs
  favoriteMethod: (value: string) => void
  color?: Color
}>()

const texts = {
  ja: {
    cat: 'カテゴリー',
    website: 'ウェブサイト',
    sdgs: 'SDGsの取り組み',
  },
  en: {
    cat: 'Categories',
    website: 'Website',
    sdgs: 'SDGs',
  },
}
</script>

<template>
  <article class="flex max-w-5xl flex-col gap-4">
    <header class="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
      <NContainerFlex wrap="nowrap" items="center" justify="between">
        <NChip :color="color || 'exhibition-a'" v-if="koma">{{ koma }}</NChip>
        <TooltipBookmark
          :active="isFavorite"
          color="success"
          class="sm:hidden"
          @click.stop="favoriteMethod(id)"
        ></TooltipBookmark>
      </NContainerFlex>
      <div>
        <h1 class="break-all text-xl md:text-3xl">
          <MarkupText :content="name"></MarkupText>
        </h1>
        <MarkupText v-if="subName" :content="subName"></MarkupText>
      </div>
      <TooltipBookmark
        :active="isFavorite"
        color="success"
        class="hidden sm:inline-block"
        @click.stop="favoriteMethod(id)"
      ></TooltipBookmark>
    </header>
    <MarkupText v-if="contents" :content="contents" class="break-all bg-gray-100 px-2 py-1">
    </MarkupText>
    <dl class="divide-y">
      <div class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ exhibition }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">{{ genre }}</dd>
      </div>
      <div v-if="webSite" class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ texts[lang].website }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">
          <NLink :href="webSite" type="external" text-aligned>{{ webSite }}</NLink>
        </dd>
      </div>
      <div v-if="sdgs" class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ texts[lang].sdgs }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">
          <SDGsIcons :numbers="sdgs as SDGs"></SDGsIcons>
        </dd>
      </div>
    </dl>
  </article>
</template>
