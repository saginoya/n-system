<script setup lang="ts">
import ListNavItem from '@/components/parts/ListNavItem.vue'
import type { Navigation } from '@/types'

defineProps<Navigation>()
</script>

<template>
  <div>
    <p class="px-1">
      <span v-if="name" class="rounded-sm bg-white px-1 font-bold text-slate-600">{{ name }}</span>
    </p>

    <ul class="flex flex-col gap-1 py-1">
      <li v-for="path in children" :key="path">
        <ListNavItem :path />
      </li>
    </ul>
  </div>
</template>
