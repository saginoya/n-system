<script setup lang="ts">
import { useColorStyle } from '@/styles'
import type { Color } from '@/types'

withDefaults(
  defineProps<{
    id: string
    color?: Color
    label?: string
  }>(),
  {
    color: 'primary',
  },
)

const { bgColor, textColor } = useColorStyle()

const active = defineModel<boolean>()
</script>

<template>
  <button class="inline-flex cursor-pointer items-center">
    <input type="checkbox" v-model="active" :id="id" class="group hidden" />
    <label
      :for="id"
      class="inline-flex rounded-full border-2 p-0.5"
      :class="active ? bgColor(color) : 'bg-slate-400'"
    >
      <div
        class="size-5 rounded-full bg-white transition-all duration-150 ease-in-out"
        :class="{ 'translate-x-8': active }"
      ></div>
      <span
        class="w-8 text-center text-sm leading-5 text-white"
        :class="{ '-translate-x-5': active }"
        >{{ active ? 'ON' : 'OFF' }}
      </span>
    </label>
    <label if="label" :for="id" :class="active ? textColor(color) : 'text-slate-400'">{{
      label
    }}</label>
  </button>
</template>
