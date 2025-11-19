<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

import NContainerFlex from '@/components/entries/layouts/NContainerFlex.ce.vue'
import { cn } from '@/lib/cn'
import { bgColorMap, textColorMap } from '@/styles'
import type { Color } from '@/types'
import { iconMap } from '@/utils'

const props = withDefaults(
  defineProps<{
    id?: string
    color?: Color
    label?: string
    labelClass?: string
  }>(),
  {
    color: 'primary',
  },
)

const enabled = defineModel<boolean>({ default: false })
</script>

<template>
  <SwitchGroup class="rounded p-2 hover:bg-blue-100">
    <NContainerFlex items="center" justify="between" wrap="nowrap">
      <SwitchLabel
        if="label"
        :class="cn('grow', enabled ? textColorMap[props.color] : 'text-gray-300', labelClass)"
      >
        {{ label }}
      </SwitchLabel>
      <Switch
        v-model="enabled"
        :id
        :class="enabled ? bgColorMap[props.color] : 'bg-gray-300'"
        class="relative inline-flex h-5 w-8 flex-none shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-4 focus:ring-info"
      >
        <span
          :class="enabled ? 'translate-x-3' : 'translate-x-0'"
          class="pointer-events-none inline-flex size-4 items-center justify-center rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        >
          <component :is="iconMap[enabled ? 'check' : 'close']" :class="textColorMap[color]" />
        </span>
      </Switch>
    </NContainerFlex>
  </SwitchGroup>
</template>
