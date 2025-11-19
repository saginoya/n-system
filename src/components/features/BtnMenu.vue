<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import BtnBase from '@/components/ui/BtnBase.vue'
import type { BtnBaseProps } from '@/components/ui/BtnBase.vue'
import { cn } from '@/lib/cn'
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
  children?: BtnBaseProps[]
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
      <MenuItems
        class="absolute inset-x-0 z-50 mx-auto mt-2 flex w-fit flex-col gap-2 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <MenuItem v-for="(child, index) in children" :key="index" v-slot="{ active }">
          <BtnBase
            :type="child.type"
            :color="child.color"
            :disabled="child.disabled"
            :name="child.name"
            :value="child.value"
            :variant="child.variant ?? 'text'"
            :prependIcon="child.prependIcon"
            :appendIcon="child.appendIcon"
            :className="cn(child.className, 'w-full', { ring: active })"
            :onClick="child.onClick"
          >
            {{ child.label }}
          </BtnBase>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
