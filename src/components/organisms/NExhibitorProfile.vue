<script setup lang="ts">
import NChip from '@/components/atoms/NChip.ce.vue'
import NLink from '@/components/atoms/NLink.ce.vue'
import NSDGsIcons from '@/components/molecules/NSDGsIcons.vue'
import type { Exhibitor } from '@/types/exhibitorList'
import type { Lang } from '@/types/lang'
import type { SDGsNumType } from '@/utils/useSDGs'

const props = defineProps<{
  lang: Lang
  exhibitor: Exhibitor
}>()

const { koma, color, name, subName, contents, exhibition, genre, categories, webSite, sdgs } =
  props.exhibitor

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
        <NChip :color="color || 'exhibition-a'" v-if="koma">{{ koma }}</NChip>
      </div>
      <div>
        <h1>{{ name }}</h1>
        <p v-if="subName">{{ subName }}</p>
      </div>
    </header>
    <div v-if="contents">
      <p class="bg-gray-100 py-1">
        {{ contents }}
      </p>
    </div>
    <dl class="divide-y">
      <div class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ exhibition }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">{{ genre }}</dd>
      </div>
      <div
        v-if="categories && categories.length > 0"
        class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6"
      >
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
        <dd class="sm:col-span-3 md:col-span-5">
          <NSDGsIcons :numbers="sdgs as SDGsNumType[]"></NSDGsIcons>
        </dd>
      </div>
    </dl>
  </article>
</template>
