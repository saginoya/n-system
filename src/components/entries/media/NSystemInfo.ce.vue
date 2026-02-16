<script setup lang="ts">
import packageJson from '@/../package.json'

const version: string = packageJson.version
</script>

<template>
  <article>
    <h1>N-System Info</h1>
    <ul>
      <li>Version: {{ version }}</li>
    </ul>
  </article>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
