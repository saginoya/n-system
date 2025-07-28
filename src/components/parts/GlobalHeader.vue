<script setup lang="ts">
import ListNavGroup from '@/components/parts/ListNavGroup.vue'
import TitleLv1Site from '@/components/parts/TitleLv1Site.vue'
import type { Navigation } from '@/types'

defineProps<{
  titleList: string[]
  navigation?: Navigation[]
}>()
</script>

<template>
  <header class="flex flex-col gap-6 bg-primary px-4 py-2 text-white">
    <TitleLv1Site :titleList="titleList"></TitleLv1Site>
    <nav class="flex flex-col gap-4 overflow-y-auto">
      <div class="flex flex-col gap-6 pb-24">
        <ListNavGroup
          v-for="item in navigation"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :type="item.type"
          :children="item.children"
        >
        </ListNavGroup>
      </div>
    </nav>
    <slot />
  </header>
</template>
