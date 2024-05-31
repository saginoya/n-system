<script setup lang="ts"></script>

<template>
  <footer class="text-white">
    <bl-nav-list :links="nav" row> </bl-nav-list>
    <hr />
    <slot />
  </footer>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
