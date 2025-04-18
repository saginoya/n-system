<script setup lang="ts">
import ListNav from '@/components/parts/ListNav.vue'
import TitleLv1Site from '@/components/parts/TitleLv1Site.vue'
import type { GlobalNav } from '@/types'

defineProps<{
  titleList: string[]
  nav: GlobalNav
}>()
</script>

<template>
  <header class="flex flex-col gap-6 bg-primary px-4 py-2 text-white">
    <TitleLv1Site :titleList="titleList"></TitleLv1Site>
    <nav class="flex flex-col gap-4 overflow-y-auto">
      <ListNav v-if="nav.header" :links="nav.header"> </ListNav>
      <ListNav v-if="nav.footer" :links="nav.footer"> </ListNav>
      <ListNav v-if="nav.related" :links="nav.related"> </ListNav>
    </nav>
    <slot />
  </header>
</template>
