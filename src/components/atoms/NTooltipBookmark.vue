<script setup lang="ts">
import { computed } from 'vue'
import IconBookmark from '@/components/icons/IconBookmark.vue'
import { useColorStyle } from '@/styles'
import type { Color } from '@/types'

const props = withDefaults(
  defineProps<{
    active: boolean
    color?: Color
  }>(),
  {
    color: 'primary',
  },
)
const { textColor } = useColorStyle()

const avtiveClass = [textColor(props.color)]
const defaultClass = ['text-gray-200']

const classState = computed(() => {
  return props.active ? avtiveClass : defaultClass
})
</script>

<template>
  <button
    type="button"
    class="inline-flex size-8 items-center justify-center rounded-full bg-slate-50"
    :class="classState"
  >
    <IconBookmark class="text-xl" />
  </button>
</template>
