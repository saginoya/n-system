<script setup lang="ts">
import IconBus from '@/components/icons/IconBus.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import IconTrain from '@/components/icons/IconTrain.vue'

withDefaults(
  defineProps<{
    name: IconsOptions
    size?: SizeOptions
  }>(),
  {
    size: 'md',
  },
)

const iconOptions = {
  bus: IconBus,
  car: IconCar,
  train: IconTrain,
  'chevron-right': IconChevronRight,
}

type IconsOptions = keyof typeof iconOptions

const sizeOptions = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
}

type SizeOptions = keyof typeof sizeOptions
</script>

<template>
  <component
    :is="iconOptions[name]"
    class="inline-block align-middle"
    :class="sizeOptions[size]"
  ></component>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
