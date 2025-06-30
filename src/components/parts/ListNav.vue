<script setup lang="ts">
import ListNavItem from '@/components/parts/ListNavItem.vue'
import type { Navigation } from '@/types'

defineProps<{
  navigation: Navigation[]
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <ListNavItem
      v-for="item in navigation"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :type="item.type"
      :children="item.children"
    >
    </ListNavItem>
  </div>
</template>
