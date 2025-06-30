<script setup lang="ts">
import ListNavRowItem from '@/components/parts/ListNavRowItem.vue'
import type { Navigation } from '@/types'

defineProps<{
  navigation: Navigation[]
}>()
</script>

<template>
  <ul class="mx-auto flex max-w-5xl flex-wrap justify-around justify-items-center">
    <li v-for="item in navigation" :key="item.id" class="text-center">
      <ListNavRowItem :id="item.id" :name="item.name" :type="item.type" :children="item.children">
      </ListNavRowItem>
    </li>
  </ul>
</template>
