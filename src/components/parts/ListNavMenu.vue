<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import ListNavItem from '@/components/parts/ListNavItem.vue'
import { cn } from '@/lib/cn'
import { chipBase, chipChildBase } from '@/styles'
import type { Navigation } from '@/types'

defineProps<Navigation>()
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton
      :class="
        cn(
          chipBase,
          'flex w-full items-center justify-between font-bold  hover:bg-blue-200/30 focus:bg-blue-200/30',
        )
      "
    >
      <span :class="chipChildBase">
        {{ name }}
      </span>
      <IconArrowDown />
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-2 shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <MenuItem v-for="path in children" :key="path">
          <ListNavItem :path class="text-slate-600" />
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
