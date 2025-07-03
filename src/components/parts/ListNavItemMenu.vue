<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import LinkBox from '@/components/parts/LinkBox.vue'
import { useRouter } from '@/composables/useRouter'
import { cn } from '@/lib/cn'
import type { Navigation } from '@/types'

const props = defineProps<Navigation>()

const routers = useRouter().getByIds(props.children)

const commonClasses =
  'px-2 py-0.5 font-bold rounded-lg text-white hover:bg-blue-200/30 focus:bg-blue-200/30'
</script>

<template>
  <Menu v-if="type === 'group'" as="div" class="relative">
    <MenuButton :class="cn(commonClasses, 'flex w-full items-center justify-between')">
      {{ name }}
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
        <MenuItem v-for="link in routers" :key="link.id">
          <LinkBox
            :href="link.path"
            :type="link.type"
            class="px-2 py-1 text-gray-900 hover:bg-blue-200/30 focus:bg-blue-200/30"
          >
            {{ link.name }}
          </LinkBox>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>

  <div v-else>
    <LinkBox :href="routers[0].path" :type="routers[0].type" :class="commonClasses">
      {{ name }}
    </LinkBox>
  </div>
</template>
