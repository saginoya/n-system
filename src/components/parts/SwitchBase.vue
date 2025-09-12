<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
import { bgColorMap, textColorMap } from '@/styles'
import type { Color } from '@/types'

const props = withDefaults(
  defineProps<{
    id?: string
    color?: Color
    label?: string
  }>(),
  {
    color: 'primary',
  },
)

const enabled = defineModel<boolean>()
</script>

<template>
  <SwitchGroup class="rounded p-2 hover:bg-blue-100">
    <NContainerFlex items="center" justify="between">
      <SwitchLabel
        if="label"
        :class="enabled ? textColorMap[props.color] : 'text-gray-300'"
        class="grow"
      >
        {{ label }}</SwitchLabel
      >
      <Switch
        v-model="enabled"
        :id
        :class="enabled ? bgColorMap[props.color] : 'bg-gray-300'"
        class="relative inline-flex h-6 w-12 flex-none shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <span
          :class="enabled ? 'translate-x-6' : 'translate-x-0'"
          class="pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        />
      </Switch>
    </NContainerFlex>
  </SwitchGroup>
</template>
