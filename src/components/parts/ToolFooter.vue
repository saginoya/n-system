<script setup lang="ts">
import ListNavGroup from '@/components/parts/ListNavGroup.vue'
import type { Navigation } from '@/types'

defineProps<{
  navigation?: Navigation[]
  copyright?: string
}>()
</script>

<template>
  <footer class="bg-primary px-4 text-white">
    <div v-if="navigation" class="hidden py-6 md:block">
      <div class="m-auto flex w-full max-w-5xl justify-between gap-4">
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
    </div>
    <hr />
    <div class="py-2 text-center">
      {{ copyright }}
    </div>
  </footer>
</template>
