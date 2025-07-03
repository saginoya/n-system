<script setup lang="ts">
import ListNavItem from '@/components/parts/ListNavItem.vue'
import ListNavItemMenu from '@/components/parts/ListNavItemMenu.vue'
import { cn } from '@/lib/cn'
import type { Navigation } from '@/types'

withDefaults(
  defineProps<{
    navigation: Navigation[]
    direction?: 'col' | 'row'
    isMenu?: boolean
  }>(),
  {
    direction: 'row',
    isMenu: false,
  },
)

const colClasses = 'flex-col gap-6'
const rowClasses = 'justify-around w-full m-auto max-w-5xl'

const directionClases = {
  col: colClasses,
  row: rowClasses,
}
</script>

<template>
  <div :class="cn('flex', directionClases[direction])">
    <div v-for="item in navigation" :key="item.id">
      <ListNavItem
        v-if="!isMenu"
        :id="item.id"
        :name="item.name"
        :type="item.type"
        :children="item.children"
      >
      </ListNavItem>
      <ListNavItemMenu
        v-else
        :id="item.id"
        :name="item.name"
        :type="item.type"
        :children="item.children"
      >
      </ListNavItemMenu>
    </div>
  </div>
</template>
