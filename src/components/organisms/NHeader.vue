<script setup lang="ts">
import NTitleLv1Site from '@/components/atoms/NTitleLv1Site.vue'
import type { GlobalNav } from '@/types/link'

defineProps<{
  titleList: string[]
  nav: GlobalNav
}>()
</script>

<template>
  <header class="flex flex-col gap-6 bg-primary px-4 py-2 text-white">
    <NTitleLv1Site :titleList="titleList"></NTitleLv1Site>
    <nav class="flex flex-col gap-4 overflow-y-auto">
      <n-list-nav v-if="nav.header" :links="nav.header"> </n-list-nav>
      <n-list-nav v-if="nav.footer" :links="nav.footer"> </n-list-nav>
      <n-list-nav v-if="nav.related" :links="nav.related"> </n-list-nav>
    </nav>
    <slot />
  </header>
</template>
