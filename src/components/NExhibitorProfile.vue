<script setup lang="ts">
import NChip from '@/components/NChip.ce.vue'
import NLink from '@/components/NLink.ce.vue'
import NSdgsIcons from '@/components/NSdgsIcons.vue'
import type { Lang } from '@/types/lang'
import type { Color } from '@/types/color'

withDefaults(
  defineProps<{
    lang: Lang
    name: string
    exhibitiion: string
    genre: string
    koma?: string
    subName?: string
    webSite?: string
    contents?: string
    categories?: string[]
    sdgs?: number[]
    color?: Color
  }>(),
  {
    color: 'exhibition-a'
  }
)

const texts = {
  ja: {
    cat: 'カテゴリー',
    website: 'ウェブサイト',
    sdgs: 'SDGsの取り組み'
  },
  en: {
    cat: 'Categories',
    website: 'Website',
    sdgs: 'SDGs'
  }
}
</script>

<template>
  <article class="flex flex-col">
    <header class="flex flex-col items-center gap-4 py-6 sm:flex-row">
      <div>
        <NChip :color v-if="koma">{{ koma }}</NChip>
      </div>
      <div>
        <h1>{{ name }}</h1>
        <p v-if="subName">{{ subName }}</p>
      </div>
    </header>
    <div v-if="contents" class="rounded bg-gray-100 p-2">
      <p>{{ contents }}</p>
    </div>
    <dl class="divide-y">
      <div class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ exhibitiion }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">{{ genre }}</dd>
      </div>
      <div v-if="categories" class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ texts[lang].cat }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">
          <ul>
            <li v-for="(category, index) in categories" :key="index">
              {{ category }}
            </li>
          </ul>
        </dd>
      </div>
      <div v-if="webSite" class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ texts[lang].website }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">
          <NLink :href="webSite" type="external" text-aligned>{{ webSite }}</NLink>
        </dd>
      </div>
      <div v-if="sdgs" class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ texts[lang].sdgs }}</dt>
        <dd class="sm:col-span-3 md:col-span-5"><NSdgsIcons :numbers="sdgs"></NSdgsIcons></dd>
      </div>
    </dl>
  </article>
</template>
