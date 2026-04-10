<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'

import { iconMap } from '@/utils'
</script>

<template>
  <Menu as="div" class="relative inline-block">
    <div>
      <MenuButton
        class="inline-flex justify-center items-center rounded-full p-2 text-2xl cursor-pointer hover:bg-black/10 hover:-rotate-15 duration-300"
      >
        <component :is="iconMap['campaign']" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 rounded min-w-2xs max-w-md bg-white shadow-lg overflow-hidden p-4 z-10 border border-gray-200"
      >
        <slot />
      </MenuItems>
    </transition>
  </Menu>
</template>

<style>
@import '@/assets/css/web-component.css';
</style>
