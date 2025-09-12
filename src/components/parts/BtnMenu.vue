<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'

import BtnBase from '@/components/parts/BtnBase.vue'
import type { Variant } from '@/styles'
import type { Color } from '@/types'
import { type Icon } from '@/utils'

defineProps<{
  label: string
  color: Color
  disabled?: boolean
  name?: string
  variant?: Variant
  prependIcon?: Icon
  className?: string
}>()
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton
      :as="BtnBase"
      :color
      :disabled
      :name
      :variant
      :prependIcon
      append-icon="arrow-down"
      :className
    >
      {{ label }}
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="absolute inset-x-0 mx-auto mt-2 w-fit bg-white shadow-lg">
        <slot />
      </MenuItems>
    </transition>
  </Menu>
</template>
