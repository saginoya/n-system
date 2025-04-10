<script setup lang="ts">
import NChip from '@/components/atoms/NChip.ce.vue'
import NLink from '@/components/atoms/NLink.ce.vue'
import NSDGsIcons from '@/components/molecules/NSDGsIcons.vue'
import type { Exhibitor, Lang } from '@/types'
import type { SDGsNumType } from '@/utils'

defineProps<{
  lang: Lang
  exhibitor: Exhibitor
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
  <article class="flex flex-col">
    <header class="flex flex-col items-center gap-4 py-6 sm:flex-row">
      <div>
        <NChip :color="exhibitor.color || 'exhibition-a'" v-if="exhibitor.koma">{{
          exhibitor.koma
        }}</NChip>
      </div>
      <div>
        <h1>{{ exhibitor.name }}</h1>
        <p v-if="exhibitor.subName">{{ exhibitor.subName }}</p>
      </div>
    </header>
    <div v-if="exhibitor.contents">
      <p class="bg-gray-100 py-1">
        {{ exhibitor.contents }}
      </p>
    </div>
    <dl class="divide-y">
      <div class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ exhibitor.exhibition }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">{{ exhibitor.genre }}</dd>
      </div>
      <div
        v-if="exhibitor.categories && exhibitor.categories.length > 0"
        class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6"
      >
        <dt class="font-bold">{{ texts[lang].cat }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">
          <ul>
            <li v-for="(category, index) in exhibitor.categories" :key="index">
              {{ category }}
            </li>
          </ul>
        </dd>
      </div>
      <div
        v-if="exhibitor.webSite"
        class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6"
      >
        <dt class="font-bold">{{ texts[lang].website }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">
          <NLink :href="exhibitor.webSite" type="external" text-aligned>{{
            exhibitor.webSite
          }}</NLink>
        </dd>
      </div>
      <div v-if="exhibitor.sdgs" class="grid grid-cols-1 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6">
        <dt class="font-bold">{{ texts[lang].sdgs }}</dt>
        <dd class="sm:col-span-3 md:col-span-5">
          <NSDGsIcons :numbers="exhibitor.sdgs as SDGsNumType[]"></NSDGsIcons>
        </dd>
      </div>
    </dl>
  </article>
</template>
