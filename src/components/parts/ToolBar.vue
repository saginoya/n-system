<script setup lang="ts">
import ListNavItem from '@/components/parts/ListNavItem.vue'
import ListNavMenu from '@/components/parts/ListNavMenu.vue'
import type { Navigation } from '@/types'

defineProps<{
  title?: string
  navigation?: Navigation[]
}>()
</script>

<template>
  <div class="bg-primary px-4 pb-2 pt-4">
    <div class="m-auto flex max-w-6xl">
      <div class="flex-none">
        <span class="text-lg font-bold text-white">{{ title }}</span>
      </div>
      <div class="hidden grow lg:block"></div>
      <nav class="hidden flex-none lg:block">
        <div class="m-auto flex w-full max-w-5xl justify-between gap-4">
          <div v-for="item in navigation" :key="item.id">
            <ListNavMenu
              v-if="item.type === 'group'"
              :id="item.id"
              :name="item.name"
              :type="item.type"
              :children="item.children"
            >
            </ListNavMenu>
            <ListNavItem
              v-else
              :path="item.children[0]"
              :class="item.id === 'language' ? 'bg-info' : ''"
            ></ListNavItem>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
