<script setup lang="ts">
import { ref } from 'vue'
import NSwitch from '@/components/NSwitch.vue'

const nexpo = ref(true)
const gwpe = ref(true)
</script>

<template>
  <NSwitch id="nexpo" v-model="nexpo" label="NEW環境点" color="exhibition-a"></NSwitch>
  <NSwitch id="gwpe" v-model="gwpe" label="地球温暖化防止展" color="exhibition-b"></NSwitch>
</template>

<style>
@import url(../assets/css/main.css);
</style>
