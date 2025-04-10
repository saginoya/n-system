<script setup lang="ts">
import NTitleLv1Site from '@/components/atoms/NTitleLv1Site.vue'
import NListNav from '@/components/molecules/NListNav.vue'
import type { GlobalNav } from '@/types'

defineProps<{
  titleList: string[]
  nav: GlobalNav
}>()
</script>

<template>
  <header class="flex flex-col gap-6 bg-primary px-4 py-2 text-white">
    <NTitleLv1Site :titleList="titleList"></NTitleLv1Site>
    <nav class="flex flex-col gap-4 overflow-y-auto">
      <NListNav v-if="nav.header" :links="nav.header"> </NListNav>
      <NListNav v-if="nav.footer" :links="nav.footer"> </NListNav>
      <NListNav v-if="nav.related" :links="nav.related"> </NListNav>
    </nav>
    <slot />
  </header>
</template>
