<script setup lang="ts">
export type CharacterCountProps = {
  value?: string | string[]
  maxlength?: number
  minlength?: number
}

defineProps<CharacterCountProps>()
</script>

<template>
  <div>
    <span v-show="minlength">{{ minlength }} &lE; </span>
    <span>{{ value?.length || 0 }}</span>
    <span v-show="maxlength"> / {{ maxlength }}</span>
  </div>
</template>
