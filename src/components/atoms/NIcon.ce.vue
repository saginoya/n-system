<script setup lang="ts">
import { computed } from 'vue'
import IconBus from '@/components/icons/IconBus.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconDisabledByDefault from '@/components/icons/IconDisabledByDefault.vue'
import IconTrain from '@/components/icons/IconTrain.vue'

const props = defineProps<{
  name: 'bus' | 'car' | 'train'
  size?: 'sm' | 'md' | 'lg'
}>()

const icon = computed(() => {
  switch (props.name) {
    case 'bus':
      return IconBus
    case 'car':
      return IconCar
    case 'train':
      return IconTrain
    default:
      return IconDisabledByDefault
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'size-6'
    case 'md':
      return 'size-8'
    case 'lg':
      return 'size-10'
    default:
      return 'size-8'
  }
})
</script>

<template>
  <component :is="icon" class="inline-block align-middle" :class="sizeClass" />
</template>

<style>
@import url(@/assets/css/main.css);
</style>
