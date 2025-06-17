<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import { variantFlatConcept } from '@/styles'
import type { Color } from '@/types'

defineProps<{
  title: string
  color: Color
}>()
</script>

<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton
      class="flex w-full justify-between rounded-lg px-4 py-2 text-white hover:opacity-50"
      :class="variantFlatConcept(color)"
    >
      <span>{{ title }}</span>
      <IconArrowDown
        :class="open ? 'rotate-180 transform' : ''"
        class="size-5 text-white transition-all"
      />
    </DisclosureButton>
    <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
      <slot />
    </DisclosurePanel>
  </Disclosure>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
