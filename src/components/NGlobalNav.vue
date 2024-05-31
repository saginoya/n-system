<script setup lang="ts"></script>

<template>
  <div class="ly_globalNav" :class="{ ly_globalNavOffSP: offSP }">
    <div class="ly_globalNav_innr">
      <nav>
        <bl-nav-list :links="nav" row> </bl-nav-list>
      </nav>
      <slot />
    </div>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
